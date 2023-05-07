const fs = require('fs');
const path = require('path');
const fsPromises = fs.promises;

async function copyFolder() {
  const filesFolder = path.join(__dirname, 'files');
  const filesCopyFolder = path.join(__dirname, 'files-copy');
  const filesFolderItems = await fsPromises.readdir(filesFolder);

  try {
    await fsPromises.mkdir(filesCopyFolder, { recursive: false });
  } catch (error) {
    if (error.code === 'EEXIST') {
      await fsPromises.rm(filesCopyFolder, { recursive: true, force: true });
      await fsPromises.mkdir(filesCopyFolder);
    } else return console.error(error.message);
  }

  for (let i = 0; i < filesFolderItems.length; i++) {
    const filesFolderPath = path.join(filesFolder, filesFolderItems[i]);
    const filesCopyFolderPath = path.join(filesCopyFolder, filesFolderItems[i]);
    try {
      await fsPromises.copyFile(filesFolderPath, filesCopyFolderPath);
    } catch (error) {
      return console.error(error.message);
    }
  }
}

copyFolder();
