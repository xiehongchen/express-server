const fs = require('fs');
const path = require('path');

const fileSizeInBytes = 20 * 1024 * 1024; // 20MB
const filePath = path.join(__dirname, 'large-file.txt');

// 生成文本内容
const text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ';

// 计算所需重复次数
const repetitions = Math.ceil(fileSizeInBytes / text.length);

// 生成文本文件
const fileStream = fs.createWriteStream(filePath);
for (let i = 0; i < repetitions; i++) {
  fileStream.write(text);
}

fileStream.end();
console.log(`Generated file: ${filePath}`);
