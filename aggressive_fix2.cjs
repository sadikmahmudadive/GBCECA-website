const fs = require('fs');
const path = require('path');

const classMap = {
  'text-gray-900': 'dark:text-gray-50',
  'text-gray-800': 'dark:text-gray-100',
  'text-gray-700': 'dark:text-gray-200',
  'text-gray-600': 'dark:text-gray-300',
  'text-gray-500': 'dark:text-gray-400',
  'text-slate-900': 'dark:text-slate-50',
  'text-slate-800': 'dark:text-slate-100',
  'text-slate-700': 'dark:text-slate-200',
  'text-slate-600': 'dark:text-slate-300',
  'text-slate-500': 'dark:text-slate-400',
  'text-primary-900': 'dark:text-primary-50',
  'text-primary-800': 'dark:text-primary-100',
  'text-primary-700': 'dark:text-primary-200',
  'text-primary-600': 'dark:text-primary-300',
  'text-black': 'dark:text-white',
  'bg-white': 'dark:bg-slate-800',
  'bg-gray-50': 'dark:bg-slate-900/50',
  'bg-gray-100': 'dark:bg-slate-800/80',
  'bg-slate-50': 'dark:bg-slate-900/50',
  'bg-slate-100': 'dark:bg-slate-800/80',
  'border-gray-100': 'dark:border-slate-700',
  'border-gray-200': 'dark:border-slate-700',
  'border-gray-300': 'dark:border-slate-600',
};

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.tsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let original = content;

      content = content.replace(/className=(["'{`])(.*?)(["'`}])/gs, (match, p1, p2, p3) => {
        let classes = p2.split(/\s+/);
        let newClasses = new Set(classes);

        classes.forEach(c => {
          if (classMap[c]) {
            // Check if there's already a dark: prefix for this type
            const typePrefix = classMap[c].split('-')[0] + '-' + classMap[c].split('-')[1]; // "dark:text", "dark:bg", "dark:border"
            // Wait, dark:text-gray-50 -> dark:text
            const parts = classMap[c].split('-');
            const type = parts[0]; // dark:text
            
            if (!classes.some(x => x.startsWith(type + '-'))) {
                newClasses.add(classMap[c]);
            }
          }
        });

        if (p2.includes('from-white') && !p2.includes('dark:from-')) {
            newClasses.add('dark:from-slate-900');
        }

        return `className=${p1}${Array.from(newClasses).join(' ')}${p3}`;
      });

      if (content !== original) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log('Updated', fullPath);
      }
    }
  }
}

processDir(path.join(__dirname, 'src'));