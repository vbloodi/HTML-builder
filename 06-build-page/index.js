// Ahhh... Too hard 😔

const fs = require('fs');
const path = require('path');
const fsPromises = fs.promises;

async function createFolder() {
  try {
    await fsPromises.mkdir(path.join(__dirname, 'project-dist'), { recursive: true });
  } catch (error) {
    return console.error(error.message);
  }
}

createFolder();

async function copyFolder() {
  const assetsFolder = path.join(__dirname, 'assets');
  const assetsCopyFolder = path.join(__dirname, 'project-dist');
  const assetsFolderItems = await fsPromises.readdir(assetsFolder);

  try {
    await fsPromises.mkdir(assetsCopyFolder, { recursive: false });
  } catch (error) {
    if (error.code === 'EEXIST') {
      await fsPromises.rm(assetsCopyFolder, { recursive: true, force: true });
      await fsPromises.mkdir(assetsCopyFolder);
    } else return console.error(error.message);
  }

  for (let i = 0; i < assetsFolderItems.length; i++) {
    const assetsFolderPath = path.join(assetsFolder, assetsFolderItems[i]);
    const assetsCopyFolderPath = path.join(assetsCopyFolder, assetsFolderItems[i]);
    try {
      await fsPromises.copyFile(assetsFolderPath, assetsCopyFolderPath);
    } catch (error) {
      return console.error(error.message);
    }
  }
}

copyFolder();

// It doesn't work anyway, u can skip this one ...
