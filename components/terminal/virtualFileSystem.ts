import { projects } from '@/lib/content/projects';
import { siteCopy } from '@/lib/content/site-copy';
import { skills } from '@/lib/content/skills';

export type VNode =
  | { type: 'file'; name: string; content: string | (() => void) }
  | { type: 'dir'; name: string; children: VNode[] };

const downloadFile = (path: string) => {
  if (typeof document !== 'undefined') {
    const a = document.createElement('a');
    a.href = path;
    a.download = path.split('/').pop() || 'download';
    document.body.appendChild(a);
    a.click();
    a.remove();
  }
};

export const rootFS: VNode = {
  type: 'dir',
  name: '~',
  children: [
    { type: 'file', name: 'resume.pdf', content: () => downloadFile('/files/Ayush_Kumar_Pandey_Resume.pdf') },
    { type: 'file', name: 'cv.pdf', content: () => downloadFile('/files/Ayush_Kumar_Pandey_CV.pdf') },
    { type: 'file', name: 'about.md', content: siteCopy.about.bio },
    { 
      type: 'file', 
      name: 'contact.txt', 
      content: `Email: ${siteCopy.contact.email}\nGitHub: ${siteCopy.contact.github}\nLinkedIn: ${siteCopy.contact.linkedin}` 
    },
    { 
      type: 'file', 
      name: 'skills.json', 
      content: JSON.stringify(skills, null, 2) 
    },
    {
      type: 'dir',
      name: 'projects',
      children: projects.map(p => ({ 
        type: 'file', 
        name: `${p.id}.md`, 
        content: `# ${p.name}\n\n${p.description}\n\nTech: ${p.techStack.join(', ')}\nGitHub: ${p.githubUrl || 'N/A'}` 
      })),
    },
    {
      type: 'dir',
      name: 'education',
      children: [
        { type: 'file', name: 'status.txt', content: `University: ${siteCopy.about.university}\nCGPA: ${siteCopy.about.cgpa}` }
      ]
    }
  ],
};

export function resolvePath(cwd: string[], targetPath: string): VNode | null {
  if (targetPath === '~' || targetPath === '/') return rootFS;
  
  const segments = targetPath.split('/').filter(Boolean);
  const isAbsolute = targetPath.startsWith('~') || targetPath.startsWith('/');
  
  const fullPath = isAbsolute ? [] : [...cwd.slice(1)];
  
  for (const seg of segments) {
    if (seg === '~' && isAbsolute) continue;
    if (seg === '..') fullPath.pop();
    else if (seg !== '.') fullPath.push(seg);
  }

  let current: VNode = rootFS;
  for (const seg of fullPath) {
    if (current.type === 'dir') {
      const next = current.children.find(c => c.name === seg);
      if (next) current = next;
      else return null;
    } else {
      return null;
    }
  }
  return current;
}

export function getFullPath(cwd: string[], targetPath: string): string[] {
    const segments = targetPath.split('/').filter(Boolean);
    const isAbsolute = targetPath.startsWith('~') || targetPath.startsWith('/');
    const fullPath = isAbsolute ? [] : [...cwd.slice(1)];
    
    for (const seg of segments) {
      if (seg === '~' && isAbsolute) continue;
      if (seg === '..') fullPath.pop();
      else if (seg !== '.') fullPath.push(seg);
    }
    return ['~', ...fullPath];
}
