const path = require('path');
const fs = require('fs');

// const appDirectory = fs.realpathSync();

console.log(process.cwd());

console.log(path.resolve(process.cwd(), 'src'));