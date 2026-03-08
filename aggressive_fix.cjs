const fs = require('fs');
const path = require('path');

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.tsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      const replacements = [
        { regex: /text-gray-900(?![\w/-])/g, replacement: 'text-gray-900 dark:text-gray-50' },
        { regex: /text-gray-800(?![\w/-])/g, replacement: 'text-gray-800 dark:text-gray-100' },
        { regex: /text-gray-700(?![\w/-])/g, replacement: 'text-gray-700 dark:text-gray-200' },
        { regex: /text-gray-600(?![\w/-])/g, replacement: 'text-gray-600 dark:text-gray-300' },
        { regex: /text-gray-500(?![\w/-])/g, replacement: 'text-gray-500 dark:text-gray-400' },

        { regex: /text-slate-900(?![\w/-])/g, replacement: 'text-slate-900 dark:text-slate-50' },
        { regex: /text-slate-800(?![\w/-])/g, replacement: 'text-slate-800 dark:text-slate-100' },
        { regex: /text-slate-700(?![\w/-])/g, replacement: 'text-slate-700 dark:text-slate-200' },
        { regex: /text-slate-600(?![\w/-])/g, replacement: 'text-slate-600 dark:text-slate-300' },
        { regex: /text-slate-500(?![\w/-])/g, replacement: 'text-slate-500 dark:text-slate-400' },

        { regex: /text-primary-900(?![\w/-])/g, replacement: 'text-primary-900 dark:text-primary-50' },
        { regex: /text-primary-800(?![\w/-])/g, replacement: 'text-primary-800 dark:text-primary-100' },
        { regex: /text-primary-700(?![\w/-])/g, replacement: 'text-primary-700 dark:text-primary-200' },
        { regex: /text-primary-600(?![\w/-])/g, replacement: 'text-primary-600 dark:text-primary-300' },
        { regex: /text-primary-500(?![\w/-])/g, replacement: 'text-primary-500 dark:text-primary-400' },

        { regex: /text-accent-900(?![\w/-])/g, replacement: 'text-accent-900 dark:text-accent-50' },
        { regex: /text-accent-800(?![\w/-])/g, replacement: 'text-accent-800 dark:text-accent-100' },
        { regex: /text-accent-700(?![\w/-])/g, replacement: 'text-accent-700 dark:text-accent-200' },

        { regex: /text-black(?![\w/-])/g, replacement: 'text-black dark:text-white' },
        
        { regex: /bg-slate-900(?![\w/-])/g, replacement: 'bg-slate-900 dark:bg-slate-50' },
        { regex: /bg-slate-800(?![\w/-])/g, replacement: 'bg-slate-800 dark:bg-slate-100' },
        { regex: /bg-slate-700(?![\w/-])/g, replacement: 'bg-slate-700 dark:bg-slate-200' },
        { regex: /bg-slate-600(?![\w/-])/g, replacement: 'bg-slate-600 dark:bg-slate-300' },
        { regex: /bg-gray-900(?![\w/-])/g, replacement: 'bg-gray-900 dark:bg-gray-50' },
        { regex: /bg-gray-800(?![\w/-])/g, replacement: 'bg-gray-800 dark:bg-gray-100' },
        { regex: /bg-gray-700(?![\w/-])/g, replacement: 'bg-gray-700 dark:bg-gray-200' },
        { regex: /bg-gray-600(?![\w/-])/g, replacement: 'bg-gray-600 dark:bg-gray-300' },
      ];

      let original = content;
      for (const { regex, replacement } of replacements) {
        // Only replace if dark: counterpart is not already in the string
        // We'll just do a replace, and then clean up duplicates like dark:text-gray-50 dark:text-gray-50
        content = content.replace(regex, replacement);
      }
      
      // Clean up duplicates (e.g. if I ran the script before and added dark:...)
      content = content.replace(/(dark:[\w-]+\s+)dark:[\w-]+/g, '$1');
      content = content.replace(/dark:text-[\w-]+\s+dark:text-[\w-]+/g, match => {
        return match.split(/\s+/)[0]; 
      });
      content = content.replace(/dark:bg-[\w-]+\s+dark:bg-[\w-]+/g, match => {
        return match.split(/\s+/)[0]; 
      });

      if (content !== original) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log('Updated', fullPath);
      }
    }
  }
}

processDir(path.join(__dirname, 'src'));