const fs = require('fs');
const path = require('path');

function createBundleCss() {
  const stylePath = path.join(__dirname, 'styles');
  const bundlePath = path.join(__dirname, 'project-dist/bundle.css');
  let writeStream = fs.createWriteStream(bundlePath);

  fs.readdir(stylePath, { withFileTypes: true }, function (error, fileNames) {
    if (error) return console.error(error.message);
    fileNames.forEach(function (fileName) {
      if (fileName.isFile() === true && path.parse(fileName.name).ext === '.css') {
        let readStream = fs.createReadStream(path.join(stylePath, fileName.name));
        readStream.on('data', (data) => writeStream.write(data));
        readStream.on('error', (error) => console.error(error.message));
      }
    });
  });
}

createBundleCss();
