const fs = require('fs');
const path = require('path');
function searchDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      searchDir(fullPath);
    } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.tsx')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      const badMatches = Array.from(content.matchAll(/className="[^"]*"/g)).filter(m => {
          const cls = m[0];
          if (cls.match(/text-(primary|accent|slate|gray|black)-(700|800|900|950)/) && !cls.match(/dark:text-/)) {
              return true;
          }
          if (cls.match(/text-black/) && !cls.match(/dark:text-/)) {
              return true;
          }
          return false;
      });
      if (badMatches.length > 0) {
          console.log(fullPath + ':');
          badMatches.forEach(m => console.log('  ' + m[0]));
      }
    }
  }
}
searchDir(path.join(__dirname, 'src'));