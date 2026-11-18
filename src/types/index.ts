export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  keyAreas: string[];
  technologies: string[];
  websiteUrl?: string; // Live web or store URL
  linkType?: 'web' | 'playstore';
  linkLabel?: string;
  isLatestFeatured?: boolean;
  status: 'Live Production' | 'Enterprise Platform' | 'Active Production';
  metrics?: { label: string; value: string }[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  type: 'Full-time' | 'Internship';
  responsibilities: string[];
  skillsUsed: string[];
  current?: boolean;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  period: string;
  highlights: string[];
}

export interface SkillCategory {
  title: string;
  iconName: string;
  description: string;
  skills: {
    name: string;
    level: string; // descriptive, e.g. "Core Expertise", "Advanced", "Proficient", "Production Active"
    tag: string;
  }[];
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
}
