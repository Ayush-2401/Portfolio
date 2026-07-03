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
    pitch: 'Decentralized, OS-independent peer-to-peer bill splitter.',
    description: 'A robust, decentralized platform designed for flatmates to split bills seamlessly without relying on a central server, ensuring privacy and cross-platform compatibility.',
    techStack: ['Rust', 'Decentralized Networks', 'P2P'],
    coverStyle: 'gradient',
    featured: true,
  },
  {
    id: 'facesort-desktop',
    name: 'FaceSort Desktop',
    pitch: 'Intelligent Offline Photo Management Desktop Application',
    description: 'Offline Windows desktop app with ArcFace 512-d embeddings and FAISS cosine similarity; confidence-based auto-assign logic. MVC + multi-threading with AI-assisted architecture.',
    techStack: ['Python', 'PySide6', 'ArcFace', 'ONNX Runtime', 'FAISS', 'SQLite'],
    githubUrl: 'https://github.com/Ayush-2401/FaceSort---ML-Project',
    coverStyle: 'gradient',
    featured: true,
  },
  {
    id: 'scientific-calculator',
    name: 'Powerful Scientific Calculator',
    pitch: 'High-precision advanced scientific calculator web application',
    description: 'Features a session-based Java backend (BigDecimal, equation solvers) and a modern React + Vite + TypeScript frontend. Includes 15+ modular mathematical tools.',
    techStack: ['Java', 'TypeScript', 'React', 'JavaFX', 'Design Patterns'],
    githubUrl: 'https://github.com/Ayush-2401/Powerful-Scientific-Calculator',
    liveUrl: 'https://powerful-scientific-calculator.vercel.app',
    coverStyle: 'gradient',
    featured: true,
  },
  {
    id: 'hand-sign-ml',
    name: 'Hand Sign Recognition System',
    pitch: 'Live webcam ASL alphabet inference pipeline',
    description: 'Achieved 94% real-time ASL alphabet accuracy using custom CNN with data augmentation and transfer learning.',
    techStack: ['Python', 'TensorFlow', 'CNN', 'OpenCV'],
    githubUrl: 'https://github.com/Ayush-2401/Hand-sign-to-Alphabet---Ml-Project',
    coverStyle: 'gradient',
    featured: false,
  },
  {
    id: 'erp-automation',
    name: 'ERP Automation Bot',
    pitch: 'Automated timetable scraping and evaluation forms',
    description: 'Automated ERP scraping with 6-XPath fallback logic for AJAX-rendered DOM; exported structured Excel reports. Reduced task times from minutes to seconds.',
    techStack: ['Python', 'Selenium', 'n8n', 'UiPath RPA', 'BeautifulSoup'],
    coverStyle: 'gradient',
    featured: false,
  },
  {
    id: 'duplicate-remover',
    name: 'Duplicate File Remover',
    pitch: 'Fast utility to identify and clean up duplicate files',
    description: 'Scans directories and identifies exact duplicates by comparing file contents rather than just names, allowing users to free up storage space safely.',
    techStack: ['JavaScript', 'Node.js', 'FileSystem'],
    githubUrl: 'https://github.com/Ayush-2401/Duplicate-File-Remover',
    coverStyle: 'gradient',
    featured: false,
  },
];
