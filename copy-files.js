const fs = require('fs');
const path = require('path');

async function copyFile(src, dest) {
  try {
    // Ensure the destination directory exists
    await fs.promises.mkdir(path.dirname(dest), { recursive: true });
    await fs.promises.copyFile(src, dest);
    console.log(`Copied ${src} to ${dest}`);
  } catch (err) {
    console.error(`Error copying ${src} to ${dest}:`, err);
  }
}

async function copyFiles(dir = '.') {
  try {
    const files = await fs.promises.readdir(dir, { withFileTypes: true });
    await Promise.all(
      files.map(async (file) => {
        const filePath = path.join(dir, file.name);
        if (file.isDirectory()) {
          if (file.name !== 'node_modules' && file.name !== '.git'&& file.name !== 'dist') {
            await copyFiles(filePath);
          }
        } else {
          await copyFile(filePath, path.join('dist', filePath));
        }
      })
    );
  } catch (err) {
    console.error('Error copying files:', err);
  }
}

copyFiles();