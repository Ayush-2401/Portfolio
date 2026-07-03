import { siteCopy } from '@/lib/content/site-copy';
import { skills } from '@/lib/content/skills';
import { projects } from '@/lib/content/projects';
import { experience } from '@/lib/content/experience';
import { resolvePath, getFullPath } from './virtualFileSystem';
import { TerminalLine } from './useTerminalStore';

export interface TerminalContext {
  cwd: string[];
  setCwd: (path: string[]) => void;
  print: (lines: TerminalLine | TerminalLine[]) => void;
  clear: () => void;
}

export type CommandHandler = (args: string[], ctx: TerminalContext) => void | Promise<void>;

const createLine = (content: string, type: TerminalLine['type'] = 'output'): TerminalLine => ({
  id: Math.random().toString(36).substr(2, 9),
  type,
  content
});

const helpHandler: CommandHandler = (_, { print }) => {
  const helpText = Object.entries(commands)
    .map(([cmd, { description }]) => `${cmd.padEnd(15)} - ${description}`)
    .join('\n');
  print(createLine(helpText));
};

const whoamiHandler: CommandHandler = (_, { print }) => {
  print(createLine(`${siteCopy.name} - ${siteCopy.role} at ${siteCopy.about.university}`));
};

const aboutHandler: CommandHandler = (_, { print }) => {
  print(createLine(siteCopy.about.bio));
};

const skillsHandler: CommandHandler = (_, { print }) => {
  let output = '';
  skills.forEach(cat => {
    output += `${cat.category}:\n`;
    cat.skills.forEach(skill => {
      const bars = Math.floor(skill.level / 10);
      const meter = '[' + '#'.repeat(bars) + '-'.repeat(10 - bars) + ']';
      output += `  ${skill.name.padEnd(15)} ${meter} ${skill.level}%\n`;
    });
    output += '\n';
  });
  print(createLine(output.trim()));
};

const projectsHandler: CommandHandler = (args, { print }) => {
  if (args.length > 0) {
    const projectName = args[0].toLowerCase();
    const project = projects.find(p => p.id === projectName);
    if (project) {
      print(createLine(`Opening project: ${project.name}... (GUI scroll logic will be wired later)`));
    } else {
      print(createLine(`Project not found: ${projectName}`, 'error'));
    }
  } else {
    const output = projects.map(p => `- ${p.id.padEnd(15)} : ${p.pitch}`).join('\n');
    print(createLine(output + '\n\nTip: type "projects <name>" to view details.'));
  }
};

const triggerDownload = async (filename: string, print: TerminalContext['print']) => {
  print(createLine(`Locating file... /home/ayush/files/${filename}`, 'system'));
  
  let progress = 0;
  return new Promise<void>((resolve) => {
    const interval = setInterval(() => {
      progress += 20;
      if (progress >= 100) {
        clearInterval(interval);
        print(createLine(`[█████████████████████████] 100%`));
        print(createLine(`✓ Download started: ${filename}`, 'success'));
        
        if (typeof document !== 'undefined') {
          const a = document.createElement('a');
          a.href = `/files/${filename}`;
          a.download = filename;
          document.body.appendChild(a);
          a.click();
          a.remove();
        }
        resolve();
      }
    }, 150);
  });
};

const resumeHandler: CommandHandler = async (_, { print }) => {
  await triggerDownload('Ayush_Kumar_Pandey_Resume.pdf', print);
};

const cvHandler: CommandHandler = async (_, { print }) => {
  await triggerDownload('Ayush_Kumar_Pandey_CV.pdf', print);
};

const contactHandler: CommandHandler = (_, { print }) => {
  print(createLine(`Email:    ${siteCopy.contact.email}\nGitHub:   ${siteCopy.contact.github}\nLinkedIn: ${siteCopy.contact.linkedin}`));
};

const socialsHandler: CommandHandler = (_, { print }) => {
  print(createLine(`[G] GitHub:   ${siteCopy.contact.github}\n[L] LinkedIn: ${siteCopy.contact.linkedin}`));
};

const educationHandler: CommandHandler = (_, { print }) => {
  const ed = experience.filter(e => e.type === 'education' || e.type === 'certification');
  const output = ed.map(e => `${e.date} | ${e.title} at ${e.organization}`).join('\n');
  print(createLine(`CGPA: ${siteCopy.about.cgpa}\n\n${output}`));
};

const lsHandler: CommandHandler = (_, { cwd, print }) => {
  const node = resolvePath(cwd, '.');
  if (node && node.type === 'dir') {
    const textOutput = node.children.map(c => c.type === 'dir' ? `${c.name}/` : c.name).join('  ');
    print(createLine(textOutput));
  }
};

const cdHandler: CommandHandler = (args, { cwd, setCwd, print }) => {
  if (args.length === 0) {
    setCwd(['~']);
    return;
  }
  const target = args[0];
  const node = resolvePath(cwd, target);
  
  if (!node) {
    print(createLine(`cd: no such file or directory: ${target}`, 'error'));
  } else if (node.type !== 'dir') {
    print(createLine(`cd: not a directory: ${target}`, 'error'));
  } else {
    setCwd(getFullPath(cwd, target));
  }
};

const catHandler: CommandHandler = async (args, { cwd, print }) => {
  if (args.length === 0) {
    print(createLine('cat: missing operand', 'error'));
    return;
  }
  
  const target = args[0];
  const node = resolvePath(cwd, target);
  
  if (!node) {
    print(createLine(`cat: ${target}: No such file or directory`, 'error'));
  } else if (node.type === 'dir') {
    print(createLine(`cat: ${target}: Is a directory`, 'error'));
  } else {
    if (typeof node.content === 'function') {
       if (node.name === 'resume.pdf' || node.name === 'cv.pdf') {
           await triggerDownload(node.name === 'resume.pdf' ? 'Ayush_Kumar_Pandey_Resume.pdf' : 'Ayush_Kumar_Pandey_CV.pdf', print);
       } else {
           node.content();
       }
    } else {
      print(createLine(node.content as string));
    }
  }
};

const clearHandler: CommandHandler = (_, { clear }) => clear();

const themeHandler: CommandHandler = (args, { print }) => {
  print(createLine(`Theme switched to ${args[0] || 'default'} (GUI toggle to be wired)`));
};

const neofetchHandler: CommandHandler = (_, { print }) => {
  const output = `
       .           ayush@portfolio
      / \\          ---------------
     /   \\         OS: AyushOS
    /_____\\        Uptime: 20 years
   /       \\       Shell: curiosity
  /_________\\      Packages: ${projects.length}
                   Theme: Terminal Green
  `;
  print(createLine(output));
};

const matrixHandler: CommandHandler = (_, { print }) => {
  print(createLine('Wake up, Neo... (Matrix animation to be wired)', 'success'));
};

const historyHandler: CommandHandler = (_, { print }) => {
  print(createLine('History loaded from store. (Use UP/DOWN arrows)'));
};

const exitHandler: CommandHandler = (_, { print }) => {
  print(createLine('Returning to GUI... (Scroll logic to be wired)'));
};

const sudoHandler: CommandHandler = (_, { print }) => {
  print(createLine('ayush is not in the sudoers file. This incident will be reported.', 'error'));
};

export const commands: Record<string, { description: string; handler: CommandHandler }> = {
  help: { description: 'List available commands', handler: helpHandler },
  whoami: { description: 'Who is Ayush?', handler: whoamiHandler },
  about: { description: 'Short bio', handler: aboutHandler },
  skills: { description: 'List skills', handler: skillsHandler },
  projects: { description: 'List or open projects', handler: projectsHandler },
  resume: { description: 'Download resume', handler: resumeHandler },
  cv: { description: 'Download CV', handler: cvHandler },
  contact: { description: 'Contact info', handler: contactHandler },
  socials: { description: 'Social links', handler: socialsHandler },
  education: { description: 'Education details', handler: educationHandler },
  cat: { description: 'Print file contents', handler: catHandler },
  ls: { description: 'List directory contents', handler: lsHandler },
  cd: { description: 'Change directory', handler: cdHandler },
  clear: { description: 'Clear terminal', handler: clearHandler },
  theme: { description: 'Switch color theme', handler: themeHandler },
  neofetch: { description: 'System info', handler: neofetchHandler },
  matrix: { description: 'Matrix easter egg', handler: matrixHandler },
  history: { description: 'Show command history', handler: historyHandler },
  exit: { description: 'Return to top', handler: exitHandler },
  gui: { description: 'Return to top', handler: exitHandler },
  sudo: { description: '???', handler: sudoHandler }
};
