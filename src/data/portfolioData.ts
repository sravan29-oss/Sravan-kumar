import { Project, Experience, Education, SkillCategory, ServiceItem } from '../types';

export const PERSONAL_INFO = {
  name: 'Sravan Kumar Naredla',
  role: 'Frontend Developer',
  heroSubtitle: 'Frontend Developer | React.js Developer',
  tagline: 'Turning Ideas Into Interactive Digital Experiences.',
  email: 'naredlasravankumar29@gmail.com',
  phone: '+91 8106907384',
  portfolioUrl: 'https://freelance-web-sk.vercel.app/',
  githubUrl: 'https://github.com/',
  linkedinUrl: 'https://linkedin.com/',
  location: 'Hyderabad, India',
  status: 'Available for Opportunities',
  introduction:
    'I am a Frontend Developer passionate about building modern, responsive, and user-friendly web applications. I specialize in React.js, JavaScript, TypeScript, HTML, CSS, and Tailwind CSS. I enjoy creating interactive interfaces, reusable components, integrating REST APIs, and developing practical digital products.',
  aboutDetails: [
    'I am a Frontend Developer with practical experience developing responsive web applications and modern user interfaces. I have worked on e-commerce, grocery delivery, and marketplace platforms.',
    'I focus on clean code, reusable components, API integration, responsive design, performance, and user experience.'
  ],
  developmentInterests: [
    'Modern Frontend Architecture & Scalable Component Design Systems',
    'Responsive, Mobile-First & Cross-Browser User Interfaces',
    'RESTful API Integration, Asynchronous Data Pipelines & State Sync',
    'Interactive 3D Web & Micro-Interactions for Web Platforms',
    'Frontend Performance Tuning, Core Web Vitals & Clean Code Standards'
  ],
  experienceHighlights: [
    'Engineered production-grade web applications utilizing React.js, TypeScript, and Tailwind CSS',
    'Developed intuitive grocery e-commerce, multi-vendor marketplace, and logistics transport systems',
    'Integrated comprehensive REST APIs for user authentication, product listings, orders, and delivery tracking',
    'Built high-performance, mobile-first responsive interfaces deployed on Web and Google Play'
  ],
  stats: [
    { label: 'Production Platforms', value: '4', suffix: '+', note: 'E-commerce, Groceries, Logistics & Marketplaces' },
    { label: 'Responsive Design', value: '100', suffix: '%', note: 'Optimized for mobile, tablet, laptop & desktop' },
    { label: 'Frontend Expertise', value: '1', suffix: '+ yrs', note: 'Hands-on React & modern web engineering' },
    { label: 'Core Technologies', value: '15', suffix: '+', note: 'Frontend, state, APIs & deployment pipelines' }
  ]
};

export const FEATURED_PROJECTS: Project[] = [
  {
    id: 'fresh-vegetables-organic',
    title: 'Fresh Vegetables Organic',
    category: 'Online Grocery & Organic Vegetable E-Commerce Platform',
    websiteUrl: 'https://fresh-vegetables-organic.vercel.app/',
    linkType: 'web',
    linkLabel: 'Live Web App',
    isLatestFeatured: true,
    status: 'Live Production',
    description:
      'An online grocery platform designed to help customers discover and order fresh vegetables through a convenient digital experience.',
    keyAreas: [
      'Customer-facing grocery website',
      'Admin dashboard and product management',
      'Product categories and inventory management',
      'Order and delivery workflows',
      'Responsive user interface',
      'Backend and database integration',
      'Location-based delivery serviceability',
      'SEO improvements'
    ],
    technologies: [
      'React.js',
      'TypeScript',
      'Vite',
      'Tailwind CSS',
      'Node.js',
      'Express.js',
      'PostgreSQL'
    ],
    metrics: [
      { label: 'Platform Type', value: 'Full-Stack E-Commerce' },
      { label: 'Architecture', value: 'REST API + PostgreSQL' },
      { label: 'Target', value: 'Fresh Grocery Delivery' }
    ]
  },
  {
    id: 'anusha-porter',
    title: 'Anusha Porter',
    category: 'On-Demand Logistics & Porter Goods Transport Platform',
    websiteUrl: 'https://play.google.com/store/apps/details?id=anushaporter.com&pcampaignid=web_share',
    linkType: 'playstore',
    linkLabel: 'Google Play Store',
    isLatestFeatured: false,
    status: 'Live Production',
    description:
      'An on-demand logistics and delivery platform designed for goods transportation, vehicle booking, fleet management, and real-time delivery tracking.',
    keyAreas: [
      'Customer and driver booking interface',
      'Trip and order management workflows',
      'Real-time delivery status & location serviceability',
      'REST API integration with backend services',
      'Fare estimation and pricing workflows',
      'Responsive mobile-first user interface',
      'Reusable UI components architecture'
    ],
    technologies: [
      'React.js',
      'JavaScript',
      'HTML5',
      'CSS3',
      'Tailwind CSS',
      'REST APIs'
    ],
    metrics: [
      { label: 'Deployment', value: 'Google Play Store' },
      { label: 'Domain', value: 'Goods Transport & Logistics' },
      { label: 'Interface', value: 'Customer & Driver Workflows' }
    ]
  },
  {
    id: 'anusha-bazaar',
    title: 'Anusha Bazaar',
    category: 'E-Commerce & Grocery Delivery Platform',
    websiteUrl: 'https://play.google.com/store/apps/details?id=com.anusha.deliveryapp&pcampaignid=web_share',
    linkType: 'playstore',
    linkLabel: 'Google Play Store',
    isLatestFeatured: false,
    status: 'Live Production',
    description:
      'An e-commerce platform focused on product browsing, shopping experiences, and grocery delivery workflows.',
    keyAreas: [
      'Product listing and product details',
      'Shopping cart interface',
      'Customer-facing workflows',
      'REST API integration',
      'Reusable UI components',
      'Responsive frontend development'
    ],
    technologies: [
      'React.js',
      'JavaScript',
      'HTML',
      'CSS',
      'Tailwind CSS'
    ],
    metrics: [
      { label: 'Domain', value: 'Retail & Grocery' },
      { label: 'Deployment', value: 'Google Play Store' },
      { label: 'Frontend', value: 'React.js Component Engine' }
    ]
  },
  {
    id: 'hinchmart',
    title: 'HinchMart',
    category: 'Marketplace Application',
    websiteUrl: 'https://play.google.com/store/apps/details?id=com.hinch&pcampaignid=web_share',
    linkType: 'playstore',
    linkLabel: 'Google Play Store',
    isLatestFeatured: false,
    status: 'Live Production',
    description:
      'A marketplace application featuring customer, seller, and product-related interfaces.',
    keyAreas: [
      'Product and marketplace interfaces',
      'Seller and customer workflows',
      'REST API integration',
      'Reusable components',
      'Responsive user interface',
      'Frontend performance improvements'
    ],
    technologies: [
      'React.js',
      'JavaScript',
      'HTML',
      'CSS',
      'Tailwind CSS'
    ],
    metrics: [
      { label: 'Domain', value: 'Multi-Vendor Marketplace' },
      { label: 'Deployment', value: 'Google Play Store' },
      { label: 'Optimization', value: 'Render & State Performance' }
    ]
  }
];

export const EXPERIENCES: Experience[] = [
  {
    id: 'anusha-bazaar-technologies',
    role: 'Frontend Developer',
    company: 'Anusha Bazaar Technologies Private Limited',
    location: 'Hyderabad, India',
    period: 'January 2026 – Present',
    current: true,
    type: 'Full-time',
    responsibilities: [
      'Developed responsive frontend applications using React.js, JavaScript, HTML, CSS, and Tailwind CSS.',
      'Built reusable UI components and maintained frontend architecture.',
      'Integrated REST APIs for authentication, products, orders, and delivery workflows.',
      'Improved user interfaces, responsiveness, performance, and maintainability.',
      'Collaborated with backend developers to integrate application features.'
    ],
    skillsUsed: ['React.js', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'REST APIs', 'Git']
  },
  {
    id: 'yuga-yatra-retail',
    role: 'Frontend Development Intern',
    company: 'Yuga Yatra Retail (OPC) Private Limited',
    location: 'Bangalore, India',
    period: 'October 2025 – December 2025',
    current: false,
    type: 'Internship',
    responsibilities: [
      'Contributed to the development of modern user interfaces and reusable frontend components for retail applications.',
      'Collaborated with engineering teams to enhance responsiveness and visual consistency across different devices.',
      'Assisted in frontend testing, debugging layout challenges, and adhering to clean component design patterns.'
    ],
    skillsUsed: ['React.js', 'JavaScript', 'Responsive Web Design', 'HTML/CSS', 'UI Testing']
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Frontend Development',
    iconName: 'Layout',
    description: 'Building responsive, high-performance, and pixel-perfect web interfaces with modern React ecosystem.',
    skills: [
      { name: 'React.js', level: 'Core Specialization', tag: 'Library' },
      { name: 'JavaScript', level: 'Advanced ES6+', tag: 'Language' },
      { name: 'TypeScript', level: 'Strong Typing', tag: 'Language' },
      { name: 'HTML5', level: 'Semantic Markup', tag: 'Structure' },
      { name: 'CSS3', level: 'Modern Styling', tag: 'Style' },
      { name: 'Tailwind CSS', level: 'Utility Architecture', tag: 'Framework' },
      { name: 'Responsive Web Design', level: 'Cross-Device Fluid', tag: 'Architecture' }
    ]
  },
  {
    title: 'Backend & API Integration',
    iconName: 'Server',
    description: 'Connecting frontend applications with robust APIs, authentication pipelines, and data handling.',
    skills: [
      { name: 'Node.js', level: 'Server Runtime', tag: 'Backend' },
      { name: 'Express.js', level: 'REST APIs & Endpoints', tag: 'Framework' },
      { name: 'REST API Integration', level: 'Client Integration', tag: 'Architecture' },
      { name: 'API Authentication', level: 'Tokens & Sessions', tag: 'Security' },
      { name: 'Data Fetching', level: 'Axios & Fetch API', tag: 'Data Flow' },
      { name: 'Error Handling', level: 'Boundary & Resiliency', tag: 'Reliability' }
    ]
  },
  {
    title: 'State Management',
    iconName: 'Cpu',
    description: 'Maintaining predictable application state, user sessions, shopping carts, and dynamic filters.',
    skills: [
      { name: 'Redux', level: 'Centralized State', tag: 'State Library' },
      { name: 'React State Management', level: 'Hooks & Context API', tag: 'React Native' }
    ]
  },
  {
    title: 'Tools & Platforms',
    iconName: 'Wrench',
    description: 'Modern developer workflow, version control, build tools, and automated deployment pipelines.',
    skills: [
      { name: 'Git', level: 'Version Control', tag: 'VCS' },
      { name: 'GitHub', level: 'Collaboration & Repos', tag: 'Platform' },
      { name: 'VS Code', level: 'Primary IDE & Tooling', tag: 'Editor' },
      { name: 'Vercel', level: 'CI/CD & Cloud Hosting', tag: 'Deployment' }
    ]
  }
];

export const EDUCATION_DATA: Education[] = [
  {
    id: 'gnitc-btech',
    degree: 'Bachelor of Technology — Electronics & Communication Engineering',
    institution: 'GNITC (Guru Nanak Institutions Technical Campus)',
    location: 'Ibrahimpatnam, Hyderabad',
    period: 'November 2022 – May 2026',
    highlights: [
      'Focus on engineering fundamentals, problem-solving, digital systems, and software programming',
      'Active developer pursuing modern web technologies and frontend application engineering',
      'Collaborated on practical academic engineering projects and web initiatives'
    ]
  },
  {
    id: 'shivani-intermediate',
    degree: 'Intermediate (MPC)',
    institution: 'Shivani Junior College',
    location: 'Palakurthi, Hanamkonda',
    period: '2020 – 2022',
    highlights: [
      'Mathematics, Physics, and Chemistry (MPC) coursework',
      'Analytical reasoning, quantitative logic, and foundation in computer fundamentals'
    ]
  },
  {
    id: 'kakatiya-ssc',
    degree: 'Secondary School Certificate (SSC)',
    institution: 'Kakatiya Vidyalayam',
    location: 'Marripalli Gudem',
    period: '2019 – 2020',
    highlights: [
      'General academic curriculum with emphasis on science, mathematics, and analytical studies',
      'Developed early passion for computers, technology, and design'
    ]
  }
];

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'frontend-web-dev',
    title: 'Frontend Website Development',
    description: 'Building end-to-end modern web applications with clean architecture, accessible components, and fast loading times.',
    icon: 'Code',
    features: ['Custom Web Applications', 'Semantic Clean Code', 'Cross-Browser Compatibility', 'SEO-Ready Structure']
  },
  {
    id: 'react-dev',
    title: 'React.js Development',
    description: 'Developing high-performance, single-page and multi-page web applications with modern React hooks, TypeScript, and Vite.',
    icon: 'Atom',
    features: ['Modular Reusable Components', 'Hooks & Context Architecture', 'TypeScript Type-Safety', 'State Synchronization']
  },
  {
    id: 'responsive-design',
    title: 'Responsive Website Design',
    description: 'Crafting fluid, mobile-first layouts that adapt naturally across smartphones, tablets, laptops, and ultra-wide screens.',
    icon: 'Smartphone',
    features: ['Mobile-First Strategy', 'Touch-Friendly UX', 'Fluid Grid Layouts', 'Adaptive Typography & Images']
  },
  {
    id: 'ecommerce-dev',
    title: 'E-Commerce Website Development',
    description: 'Building robust online stores with product catalogs, filtering, cart management, checkout flows, and order tracking.',
    icon: 'ShoppingBag',
    features: ['Product Catalogues & Filters', 'Interactive Shopping Carts', 'Order & Delivery Interfaces', 'WhatsApp Ordering Workflows']
  },
  {
    id: 'rest-api-integration',
    title: 'REST API Integration',
    description: 'Connecting frontend clients with backend microservices, handling asynchronous data, error boundaries, and token authentication.',
    icon: 'Network',
    features: ['Secure Token Authentication', 'Asynchronous Data Fetching', 'Resilient Error Handling', 'Pagination & Search APIs']
  },
  {
    id: 'ui-improvements',
    title: 'Website UI Improvements',
    description: 'Upgrading dated interfaces into sleek, modern, accessible, and high-converting experiences with smooth animations.',
    icon: 'Sparkles',
    features: ['Design Revamping', 'Micro-Interactions & Animations', 'Accessibility (a11y) Refinements', 'Typography & Visual Polish']
  },
  {
    id: 'website-maintenance',
    title: 'Website Maintenance',
    description: 'Providing ongoing code updates, bug fixing, dependency management, speed optimization, and responsive design fixes.',
    icon: 'ShieldCheck',
    features: ['Bug Fixing & Troubleshooting', 'Dependency Upgrades', 'Performance & Speed Audits', 'Layout & Device Compatibility Fixes']
  }
];
