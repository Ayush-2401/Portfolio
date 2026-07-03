export interface Project {
  id: string;
  name: string;
  pitch: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  coverStyle: 'gradient' | 'image';
  coverImage?: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: 'flatledger',
    name: 'FlatLedger',
    pitch: 'Decentralized, serverless peer-to-peer bill splitter for flatmates.',
    description: 'FlatLedger uses mDNS and Rust to create a local-first peer-to-peer network for splitting bills seamlessly without a central server.',
    techStack: ['Rust', 'Ed25519', 'mDNS', 'UPI Deep Links'],
    githubUrl: 'https://github.com/Ayush-2401',
    coverStyle: 'gradient',
    featured: true,
  },
  {
    id: 'slam-nav',
    name: 'SLAM Navigation',
    pitch: 'Simultaneous Localization and Mapping for autonomous navigation.',
    description: 'A computer vision project implementing SLAM algorithms for real-time spatial mapping.',
    techStack: ['Python', 'OpenCV', 'Computer Vision'],
    githubUrl: 'https://github.com/Ayush-2401',
    coverStyle: 'gradient',
    featured: true,
  },
  {
    id: 'traventure',
    name: 'Traventure',
    pitch: 'A smart travel itinerary planner and explorer.',
    description: 'Full-stack application helping users plan and track their adventures globally.',
    techStack: ['Next.js', 'React', 'Tailwind CSS'],
    githubUrl: 'https://github.com/Ayush-2401',
    coverStyle: 'gradient',
    featured: false,
  },
  {
    id: 'flight-aggregator',
    name: 'Flight Aggregator',
    pitch: 'Real-time flight search and price comparison engine.',
    description: 'Aggregates flight data from multiple sources to find the best deals for users.',
    techStack: ['Java', 'Spring Boot', 'REST APIs'],
    githubUrl: 'https://github.com/Ayush-2401',
    coverStyle: 'gradient',
    featured: false,
  },
];
