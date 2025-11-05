const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, './../dist/dunstable-experience-centre/browser/index.html');

fs.readFile(indexPath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading index.html:', err);
        return;
    }

    // Replace type="module" with defer
    const modifiedData = data.replace(/type="module"/g, 'defer');

    fs.writeFile(indexPath, modifiedData, 'utf8', (err) => {
        if (err) {
            console.error('Error writing index.html:', err);
        } else {
            console.log('Successfully modified index.html for UC Engine.');
        }
    });
});
