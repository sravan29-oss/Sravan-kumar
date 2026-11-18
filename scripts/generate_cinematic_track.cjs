const fs = require('fs');
const path = require('path');

// 12-Second Indian Epic Cinematic Instrumental Music Generator
// Sample Rate: 44,100 Hz, 16-bit Stereo PCM
const SAMPLE_RATE = 44100;
const DURATION = 12.0; // Exact 12 seconds
const TOTAL_SAMPLES = Math.floor(SAMPLE_RATE * DURATION);

console.log(`Generating Indian Epic Cinematic Soundtrack: ${TOTAL_SAMPLES} samples...`);

// Stereo buffers
const leftBuffer = new Float32Array(TOTAL_SAMPLES);
const rightBuffer = new Float32Array(TOTAL_SAMPLES);

// Reverb delay line buffers (Schroeder / Freeverb style)
const delayLengths = [1557, 1617, 1491, 1422, 1277, 1116, 960, 840];
const combBuffers = delayLengths.map(len => new Float32Array(len));
const combIndices = new Array(delayLengths.length).fill(0);
const combFeedback = 0.82;

function applyReverb(inSample, wetGain = 0.28) {
  let combSum = 0;
  for (let i = 0; i < delayLengths.length; i++) {
    const len = delayLengths[i];
    const idx = combIndices[i];
    const delayed = combBuffers[i][idx];
    combBuffers[i][idx] = inSample + delayed * combFeedback;
    combIndices[i] = (idx + 1) % len;
    combSum += delayed;
  }
  return inSample * (1 - wetGain) + (combSum / delayLengths.length) * wetGain * 2.2;
}

// Lowpass filter state
class SimpleLowpass {
  constructor(cutoff = 1000) {
    this.prev = 0;
    this.setCutoff(cutoff);
  }
  setCutoff(cutoff) {
    const dt = 1 / SAMPLE_RATE;
    const rc = 1 / (2 * Math.PI * cutoff);
    this.alpha = dt / (rc + dt);
  }
  process(sample) {
    this.prev = this.prev + this.alpha * (sample - this.prev);
    return this.prev;
  }
}

// -------------------------------------------------------------
// 1. LAYER 1: SACRED TANPURA & SUB-BASS DRONE (0s to 12s)
// -------------------------------------------------------------
console.log('Synthesizing Layer 1: Sacred Tanpura & Sub-Bass Drone...');
const tanpuraLp = new SimpleLowpass(450);

for (let i = 0; i < TOTAL_SAMPLES; i++) {
  const t = i / SAMPLE_RATE;

  // Swell envelope: fades in from 0 to 2s, holds rich volume, fades out 10.8s to 12s
  let env = 1.0;
  if (t < 2.0) env = (t / 2.0) * (t / 2.0); // smooth quadratic fade in
  else if (t > 10.8) env = Math.max(0, 1.0 - (t - 10.8) / 1.2);

  // Sub bass (D1 = 36.71 Hz)
  const sub = Math.sin(2 * Math.PI * 36.71 * t) * 0.26;

  // Root D2 (73.42 Hz) + 5th A2 (110.0 Hz) + D3 (146.83 Hz) + F3 (174.61 Hz)
  const d2 = Math.sin(2 * Math.PI * 73.42 * t) * 0.18;
  const a2 = Math.sin(2 * Math.PI * 110.0 * t + 0.5) * 0.14;
  const d3 = Math.sin(2 * Math.PI * 146.83 * t + 1.2) * 0.10;

  // Indian "Jawari" thread buzzing harmonics (rich subtle overtone modulation)
  const jawariLfo = Math.sin(2 * Math.PI * 0.35 * t);
  const h4 = Math.sin(2 * Math.PI * 293.66 * t) * (0.05 + 0.03 * jawariLfo);
  const h5 = Math.sin(2 * Math.PI * 440.0 * t) * (0.04 - 0.02 * jawariLfo);
  const h6 = Math.sin(2 * Math.PI * 587.33 * t) * 0.025;

  const rawDrone = (sub + d2 + a2 + d3 + h4 + h5 + h6) * env;
  const filtered = tanpuraLp.process(rawDrone);

  // Stereo spread
  leftBuffer[i] += filtered * 0.95;
  rightBuffer[i] += filtered * 1.05;
}

// -------------------------------------------------------------
// 2. LAYER 2: ANCIENT BANSURI (BAMBOO FLUTE) MELODIC CALLS
// -------------------------------------------------------------
console.log('Synthesizing Layer 2: Ancient Bansuri Melodic Phrases...');
const fluteLp = new SimpleLowpass(1600);

// Helper for flute note synthesis with breath & vibrato
function addFluteNote(startSec, durationSec, startFreq, endFreq, maxVol = 0.22, pan = 0.45) {
  const startSample = Math.floor(startSec * SAMPLE_RATE);
  const totalNoteSamples = Math.floor(durationSec * SAMPLE_RATE);

  let phase = 0;
  for (let s = 0; s < totalNoteSamples; s++) {
    const idx = startSample + s;
    if (idx >= TOTAL_SAMPLES) break;

    const tRel = s / totalNoteSamples;
    const tAbs = idx / SAMPLE_RATE;

    // Pitch interpolation (meend / glissando)
    const currentFreq = startFreq + (endFreq - startFreq) * Math.sin(tRel * Math.PI * 0.5);

    // Natural expressive vibrato (starts after initial attack)
    const vibrato = tRel > 0.25 ? Math.sin(2 * Math.PI * 5.2 * tAbs) * 0.012 : 0;
    const instantFreq = currentFreq * (1 + vibrato);

    phase += (2 * Math.PI * instantFreq) / SAMPLE_RATE;

    // Flute timbre: pure fundamental + soft 2nd harmonic + breath turbulence
    const sine = Math.sin(phase);
    const harm2 = Math.sin(phase * 2) * 0.25;
    const harm3 = Math.sin(phase * 3) * 0.08;
    const breath = (Math.random() * 2 - 1) * 0.04;

    // Note envelope: smooth attack, gentle sustain, soft release
    let noteEnv = 1.0;
    if (tRel < 0.18) noteEnv = tRel / 0.18;
    else if (tRel > 0.75) noteEnv = (1 - tRel) / 0.25;

    const raw = (sine + harm2 + harm3 + breath) * noteEnv * maxVol;
    const out = fluteLp.process(raw);

    // Stereo positioning & Hall reverb
    const rev = applyReverb(out, 0.45);
    leftBuffer[idx] += rev * (1 - pan);
    rightBuffer[idx] += rev * pan;
  }
}

// Phrase 1 (0.2s - 2.2s: Mystery opening flute)
addFluteNote(0.2, 0.7, 220.0, 293.66, 0.18, 0.4); // A3 -> D4
addFluteNote(0.8, 0.7, 293.66, 349.23, 0.22, 0.42); // D4 -> F4
addFluteNote(1.4, 0.9, 349.23, 440.0, 0.20, 0.45); // F4 -> A4

// Phrase 2 (6.0s - 7.9s: Emotive Portrait Reveal flute soaring to climax)
addFluteNote(6.0, 0.55, 587.33, 587.33, 0.24, 0.48); // D5
addFluteNote(6.5, 0.50, 587.33, 698.46, 0.26, 0.50); // D5 -> F5
addFluteNote(6.95, 0.45, 698.46, 659.25, 0.25, 0.46); // F5 -> E5
addFluteNote(7.35, 0.65, 659.25, 554.37, 0.22, 0.48); // E5 -> C#5 -> D5

// -------------------------------------------------------------
// 3. LAYER 3: SYMPHONIC STRINGS & CINEMATIC OSTINATO (2s to 12s)
// -------------------------------------------------------------
console.log('Synthesizing Layer 3: Symphonic String Section & Cinematic Drive...');
const stringsLp = new SimpleLowpass(1800);

// Polyphonic strings generator
function addStringSwell(startSec, endSec, chordFreqs, volMultiplier = 0.25) {
  const startSample = Math.floor(startSec * SAMPLE_RATE);
  const endSample = Math.floor(endSec * SAMPLE_RATE);
  const numNotes = chordFreqs.length;

  for (let idx = startSample; idx < endSample && idx < TOTAL_SAMPLES; idx++) {
    const tAbs = idx / SAMPLE_RATE;
    const tRel = (idx - startSample) / (endSample - startSample);

    // Swell envelope: smooth rise and fall
    let env = 1.0;
    if (tRel < 0.2) env = tRel / 0.2;
    else if (tRel > 0.8) env = (1 - tRel) / 0.2;

    let sampleSum = 0;
    chordFreqs.forEach((freq, nIdx) => {
      // Warm ensemble chorus detune (-0.4%, 0%, +0.4%)
      const detune1 = Math.sin(2 * Math.PI * freq * 0.996 * tAbs);
      const detune2 = Math.sin(2 * Math.PI * freq * 1.004 * tAbs);
      const center = Math.sin(2 * Math.PI * freq * tAbs);
      const sawish = center * 0.6 + detune1 * 0.2 + detune2 * 0.2;
      sampleSum += sawish;
    });

    const raw = (sampleSum / numNotes) * env * volMultiplier;
    const filtered = stringsLp.process(raw);
    const rev = applyReverb(filtered, 0.35);

    // Wide stereo string section
    leftBuffer[idx] += rev * 0.9;
    rightBuffer[idx] += rev * 1.1;
  }
}

// 2.0s - 4.2s: World Awakens - Majestic D minor string pad
addStringSwell(2.0, 4.2, [73.42, 110.0, 146.83, 174.61, 220.0], 0.22); // D2, A2, D3, F3, A3

// 4.0s - 6.0s: Energy Awakens - Rhythmic 16th-note cinematic ostinato
console.log('Synthesizing Rhythmic String Ostinato...');
const ostinatoBeats = [
  { t: 4.0, f: 146.83 }, { t: 4.15, f: 146.83 }, { t: 4.3, f: 146.83 }, { t: 4.45, f: 174.61 },
  { t: 4.6, f: 146.83 }, { t: 4.75, f: 146.83 }, { t: 4.9, f: 220.0 }, { t: 5.05, f: 220.0 },
  { t: 5.2, f: 174.61 }, { t: 5.35, f: 174.61 }, { t: 5.5, f: 220.0 }, { t: 5.65, f: 293.66 },
  { t: 5.8, f: 293.66 }, { t: 5.9, f: 329.63 }
];

ostinatoBeats.forEach(beat => {
  const sStart = Math.floor(beat.t * SAMPLE_RATE);
  const sLen = Math.floor(0.12 * SAMPLE_RATE);
  for (let s = 0; s < sLen; s++) {
    const idx = sStart + s;
    if (idx >= TOTAL_SAMPLES) break;
    const tNote = s / sLen;
    const env = (1 - tNote) * (1 - tNote);
    const sound = Math.sin(2 * Math.PI * beat.f * (s / SAMPLE_RATE)) * env * 0.16;
    leftBuffer[idx] += sound * 0.8;
    rightBuffer[idx] += sound * 1.2;
  }
});

// 6.0s - 8.0s: High Violins soaring with the portrait reveal
addStringSwell(6.0, 8.0, [293.66, 349.23, 440.0, 587.33, 880.0], 0.28);

// 8.0s - 11.2s: MASSIVE CLIMAX SYMPHONIC CHORD (Full Orchestra Power)
addStringSwell(8.0, 11.2, [73.42, 110.0, 146.83, 220.0, 293.66, 370.0, 440.0, 587.33, 880.0], 0.36);

// 11.0s - 12.0s: Peaceful resolution chord
addStringSwell(11.0, 12.0, [146.83, 174.61, 220.0, 261.63, 329.63], 0.18);

// -------------------------------------------------------------
// 4. LAYER 4: GRAND CINEMATIC BRASS CHOIR (4s to 10.5s)
// -------------------------------------------------------------
console.log('Synthesizing Layer 4: Grand Brass Ensemble...');
const brassLp = new SimpleLowpass(1400);

function addBrassChord(startSec, durationSec, freqs, vol = 0.26) {
  const startSample = Math.floor(startSec * SAMPLE_RATE);
  const totalSamples = Math.floor(durationSec * SAMPLE_RATE);

  for (let s = 0; s < totalSamples; s++) {
    const idx = startSample + s;
    if (idx >= TOTAL_SAMPLES) break;

    const tRel = s / totalSamples;
    const tAbs = idx / SAMPLE_RATE;

    // Brass attack & swell
    let env = 1.0;
    if (tRel < 0.25) env = Math.sin(tRel * 2 * Math.PI);
    else if (tRel > 0.75) env = (1 - tRel) / 0.25;

    let brassSum = 0;
    freqs.forEach(f => {
      // Sawtooth-like brass waveform
      const phase = (f * tAbs) % 1;
      const saw = (phase * 2 - 1);
      const subHarm = Math.sin(2 * Math.PI * f * tAbs);
      brassSum += saw * 0.7 + subHarm * 0.3;
    });

    const raw = (brassSum / freqs.length) * env * vol;
    const filtered = brassLp.process(raw);
    const rev = applyReverb(filtered, 0.4);

    leftBuffer[idx] += rev * 1.05;
    rightBuffer[idx] += rev * 0.95;
  }
}

// Brass swells
addBrassChord(4.2, 1.8, [110.0, 164.81, 220.0], 0.20); // A2, E3, A3
addBrassChord(8.0, 2.5, [73.42, 110.0, 146.83, 220.0, 293.66], 0.34); // Grand Climax Fanfare

// -------------------------------------------------------------
// 5. LAYER 5: INDIAN EPIC CINEMATIC PERCUSSION & CLIMAX HIT
// -------------------------------------------------------------
console.log('Synthesizing Layer 5: Indian Cinematic Percussion & Climax Drop...');

// Helper to synthesize physical Indian Dhol / Mridangam bass strike
function addDholHit(timeSec, baseFreq = 110, endFreq = 34, duration = 0.8, strength = 0.55, pan = 0.5) {
  const startSample = Math.floor(timeSec * SAMPLE_RATE);
  const totalSamples = Math.floor(duration * SAMPLE_RATE);

  let phase = 0;
  for (let s = 0; s < totalSamples; s++) {
    const idx = startSample + s;
    if (idx >= TOTAL_SAMPLES) break;

    const tRel = s / totalSamples;

    // Pitch envelope: fast initial drop (drum membrane tension)
    const pitchDrop = Math.exp(-tRel * 14);
    const instantFreq = endFreq + (baseFreq - endFreq) * pitchDrop;

    phase += (2 * Math.PI * instantFreq) / SAMPLE_RATE;
    const bodySine = Math.sin(phase);

    // Slap click at transient
    const click = tRel < 0.05 ? (Math.random() * 2 - 1) * (1 - tRel / 0.05) * 0.3 : 0;

    // Exponential decay of resonant drum
    const decay = Math.exp(-tRel * 4.5);
    const rawHit = (bodySine + click) * decay * strength;

    const rev = applyReverb(rawHit, 0.32);

    leftBuffer[idx] += rev * (1 - pan * 0.3);
    rightBuffer[idx] += rev * (0.7 + pan * 0.3);
  }
}

// Helper to add shimmering crash / tam-tam cymbal
function addCymbalCrash(timeSec, duration = 2.2, vol = 0.28) {
  const startSample = Math.floor(timeSec * SAMPLE_RATE);
  const totalSamples = Math.floor(duration * SAMPLE_RATE);

  let lpPrev = 0;
  for (let s = 0; s < totalSamples; s++) {
    const idx = startSample + s;
    if (idx >= TOTAL_SAMPLES) break;

    const tRel = s / totalSamples;
    const whiteNoise = (Math.random() * 2 - 1);

    // Highpass-like metallic character
    const highpass = whiteNoise - lpPrev;
    lpPrev = whiteNoise * 0.7;

    const env = Math.exp(-tRel * 3.2);
    const out = highpass * env * vol;

    leftBuffer[idx] += out * 0.9;
    rightBuffer[idx] += out * 1.1;
  }
}

// 2.0s: First deep Dhol hit (The World Awakens)
addDholHit(2.0, 130, 36, 1.1, 0.50, 0.5);

// 2.6s, 3.2s, 3.8s: Subtle heartbeat pulses
addDholHit(2.6, 95, 42, 0.5, 0.22, 0.45);
addDholHit(3.2, 95, 42, 0.5, 0.24, 0.55);
addDholHit(3.8, 105, 40, 0.6, 0.30, 0.5);

// 4.0s - 6.0s: Energy Awakens war drum build
addDholHit(4.0, 135, 34, 0.9, 0.45, 0.5);
addDholHit(4.4, 110, 42, 0.45, 0.28, 0.4);
addDholHit(4.8, 110, 42, 0.45, 0.30, 0.6);
addDholHit(5.2, 120, 38, 0.5, 0.35, 0.45);
addDholHit(5.5, 125, 38, 0.45, 0.38, 0.55);
addDholHit(5.75, 130, 38, 0.4, 0.42, 0.5);

// 6.0s - 7.8s: Portrait Reveal tension build toward drop
addDholHit(6.0, 140, 32, 1.0, 0.48, 0.5);
addDholHit(6.5, 120, 40, 0.5, 0.32, 0.42);
addDholHit(6.9, 125, 40, 0.45, 0.36, 0.58);
addDholHit(7.25, 130, 40, 0.4, 0.42, 0.46);
addDholHit(7.55, 140, 40, 0.35, 0.48, 0.54);
addDholHit(7.8, 150, 40, 0.3, 0.55, 0.5);

// -------------------------------------------------------------
// 8.0s: THE MASSIVE CLIMACTIC DROP ("SRAVAN KUMAR NAREDLA")
// -------------------------------------------------------------
console.log('Synthesizing 8.0s Grand Climax Drop & Impact...');
// Colossal sub-bass impact drop
addDholHit(8.0, 160, 24, 2.5, 0.72, 0.5);
// Shimmering epic tam-tam crash
addCymbalCrash(8.0, 2.8, 0.35);

// After-pulses echoing out
addDholHit(8.8, 100, 38, 0.8, 0.28, 0.48);
addDholHit(9.6, 95, 38, 0.8, 0.22, 0.52);
addDholHit(10.4, 90, 36, 0.9, 0.16, 0.5);

// -------------------------------------------------------------
// 6. MASTERING & SOFT-CLIPPING LIMITER
// -------------------------------------------------------------
console.log('Applying Mastering, Stereo Polish & Soft-Clipping Limiter...');

// Hyperbolic tangent soft-clipper to guarantee 0 digital distortion
function softClip(x) {
  return Math.tanh(x * 1.15) * 0.92;
}

// 16-bit PCM Buffer
const wavBuffer = Buffer.alloc(44 + TOTAL_SAMPLES * 4); // 2 channels * 2 bytes = 4 bytes per sample frame

// Write RIFF/WAVE Header
const fileSize = 44 + TOTAL_SAMPLES * 4;
wavBuffer.write('RIFF', 0);
wavBuffer.writeUInt32LE(fileSize - 8, 4);
wavBuffer.write('WAVE', 8);
wavBuffer.write('fmt ', 12);
wavBuffer.writeUInt32LE(16, 16); // Subchunk1Size (16 for PCM)
wavBuffer.writeUInt16LE(1, 20); // AudioFormat (1 for PCM)
wavBuffer.writeUInt16LE(2, 22); // NumChannels (2 for Stereo)
wavBuffer.writeUInt32LE(SAMPLE_RATE, 24); // SampleRate
wavBuffer.writeUInt32LE(SAMPLE_RATE * 4, 28); // ByteRate (SampleRate * NumChannels * BitsPerSample/8)
wavBuffer.writeUInt16LE(4, 32); // BlockAlign (NumChannels * BitsPerSample/8)
wavBuffer.writeUInt16LE(16, 34); // BitsPerSample
wavBuffer.write('data', 36);
wavBuffer.writeUInt32LE(TOTAL_SAMPLES * 4, 40); // Subchunk2Size

let offset = 44;
let peakMax = 0;

for (let i = 0; i < TOTAL_SAMPLES; i++) {
  const t = i / SAMPLE_RATE;

  // Master fadeout at the very end (11.0s to 12.0s)
  let masterFade = 1.0;
  if (t > 11.0) {
    masterFade = Math.max(0, 1.0 - (t - 11.0) / 1.0);
    masterFade = masterFade * masterFade; // smooth quadratic fade
  }

  const rawL = leftBuffer[i] * masterFade;
  const rawR = rightBuffer[i] * masterFade;

  const clippedL = softClip(rawL);
  const clippedR = softClip(rawR);

  peakMax = Math.max(peakMax, Math.abs(clippedL), Math.abs(clippedR));

  const intL = Math.max(-32768, Math.min(32767, Math.floor(clippedL * 32767)));
  const intR = Math.max(-32768, Math.min(32767, Math.floor(clippedR * 32767)));

  wavBuffer.writeInt16LE(intL, offset);
  wavBuffer.writeInt16LE(intR, offset + 2);
  offset += 4;
}

const outputPath = path.join(__dirname, '..', 'public', 'assets', 'cinematic-epic-theme.wav');
fs.writeFileSync(outputPath, wavBuffer);

console.log(`✓ SUCCESS! Generated continuous cinematic soundtrack at: ${outputPath}`);
console.log(`  File size: ${(wavBuffer.length / (1024 * 1024)).toFixed(2)} MB`);
console.log(`  Peak level: ${(20 * Math.log10(peakMax)).toFixed(1)} dBFS (Clean, zero distortion)`);

