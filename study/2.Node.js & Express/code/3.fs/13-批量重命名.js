const fs = require('fs');
const path = require('path');

const files = fs.readdirSync('./');

const jsFiles = files.filter((file) => path.extname(file) === '.js');

console.log(jsFiles);

jsFiles.forEach((file, index) => {
  const data = file.split('-');
  let [num, name] = data;
  num = (`${index + 1}`).padStart(2, '0');
  const newName = `${num}-${name}`;
  console.log(newName);

  fs.renameSync(`./${file}`, `./${newName}`);
});
