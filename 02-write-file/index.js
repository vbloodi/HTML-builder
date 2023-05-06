const fs = require('fs');
const path = require('path');
const { exit } = require('process');

const textPath = path.join(__dirname, 'text.txt');

const writeText = fs.createWriteStream(textPath);

console.log('Write something in text.txt file');

process.stdin.on('data', (data) => {
  const enteredText = data.toString().trim() + '\n';
  if (enteredText === 'exit\n') {
    console.log('Goodbye!');
    exit();
  } else {
    writeText.write(enteredText);
  }
});

process.on('SIGINT', () => {
  process.stdout.write('Goodbye!');
  exit();
});
