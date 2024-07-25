const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'data.json');

const writeToFile = (data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  console.log('Data written to file:', filePath);
};

const readFromFile = () => {
  try {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    console.log('Data read from file:', data);
    return data;
  } catch (err) {
    console.error('Error reading file:', err);
    return null;
  }
};

// Example usage
const data = { message: 'Hello, world!' };
writeToFile(data);
const readData = readFromFile();
