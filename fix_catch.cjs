const fs = require('fs');
function restoreCatch(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replaceAll('} catch {', '} catch (err) {');
    fs.writeFileSync(filePath, content, 'utf8');
}
restoreCatch('src/pages/Auth/Login.jsx');
restoreCatch('src/pages/Admin/Admin.jsx');
