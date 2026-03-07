const fs = require('fs');
const path = require('path');

function replaceInFile(filePath, replacements) {
    const fullPath = path.resolve(__dirname, filePath);
    if (!fs.existsSync(fullPath)) {
        console.log('File not found: ' + fullPath);
        return;
    }
    let content = fs.readFileSync(fullPath, 'utf8');
    let original = content;
    
    for (const [search, replace] of replacements) {
        if (typeof search === 'string') {
            content = content.replaceAll(search, replace);
        } else {
            content = content.replace(search, replace);
        }
    }
    
    if (content !== original) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log('Updated ' + filePath);
    }
}

replaceInFile('src/components/Navbar.jsx', [
    ['bg-gradient-to-br', 'bg-linear-to-br']
]);

replaceInFile('src/pages/Home/Home.jsx', [
    ['bg-gradient-to-br', 'bg-linear-to-br'],
    ['bg-white/[0.06]', 'bg-white/6']
]);

replaceInFile('src/pages/About/About.jsx', [
    ['bg-gradient-to-br', 'bg-linear-to-br']
]);

replaceInFile('src/pages/Events/Events.jsx', [
    ['bg-gradient-to-t', 'bg-linear-to-t'],
    ['filtered.map((event, i)', 'filtered.map((event)']
]);

replaceInFile('src/pages/Gallery/Gallery.jsx', [
    ['bg-gradient-to-t', 'bg-linear-to-t'],
    ['aspect-[4/3]', 'aspect-4/3'],
    ['z-[100]', 'z-100']
]);

replaceInFile('src/pages/Committee/Committee.jsx', [
    ['bg-gradient-to-t', 'bg-linear-to-t']
]);

replaceInFile('src/pages/Contact/Contact.jsx', [
    ['bg-gradient-to-br', 'bg-linear-to-br']
]);

replaceInFile('src/pages/Auth/Login.jsx', [
    ['bg-gradient-to-br', 'bg-linear-to-br'],
    ['w-112', 'w-md'],
    ['h-112', 'h-md'],
    ['catch (err)', 'catch']
]);

replaceInFile('src/pages/Dashboard/Dashboard.jsx', [
    ['bg-gradient-to-r', 'bg-linear-to-r']
]);

replaceInFile('src/pages/Admin/Admin.jsx', [
    ['import { collection, getDocs, deleteDoc, doc, updateDoc, setDoc }', 'import { collection, getDocs, deleteDoc, doc, updateDoc }'],
    ['catch (err)', 'catch']
]);

replaceInFile('src/components/SectionTitle.jsx', [
    ['bg-gradient-to-r', 'bg-linear-to-r'],
    ['h-[3px]', 'h-0.75']
]);

replaceInFile('src/components/ScrollReveal.jsx', [
    ['  duration = 0.6,\n', '']
]);

replaceInFile('src/contexts/AuthContext.jsx', [
    ['export const useAuth', '// eslint-disable-next-line react-refresh/only-export-components\nexport const useAuth']
]);

