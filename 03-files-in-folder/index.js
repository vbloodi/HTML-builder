const fs = require('fs');
const path = require('path');

const pathFolder = path.join(__dirname, 'secret-folder');

fs.readdir(pathFolder, (error, file) => {
  if (error) return console.error(error.message);
  file.forEach((file) => {
    fs.stat(path.resolve(pathFolder, file), (error, stat) => {
      if (error) return console.error(error.message);
      if (stat.isFile()) {
        console.log(`${path.parse(file).name} - ${path.extname(file)} - ${(stat.size / 1024).toFixed(2)} Kb`);
      }
    });
  });
});
