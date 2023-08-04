const fs = require('fs');

function saveReqToFile(req, filePath, callback) {
  // 用于存储已遍历的对象引用
  const seen = [];

  // replacer 函数，处理循环引用情况
  const replacer = (key, value) => {
    if (typeof value === 'object' && value !== null) {
      if (seen.indexOf(value) !== -1) {
        // 如果对象已被遍历，返回一个占位符字符串
        return '[Circular Reference]';
      }
      seen.push(value);
    }
    return value;
  };

  // 将 req 对象转换为 JSON 字符串，使用 replacer 函数处理循环引用
  const reqData = JSON.stringify(req, replacer, 2);

  // 将 req 数据写入文件
  fs.writeFile(filePath, reqData, (err) => {
    if (err) {
      console.error('下载失败:', err);
      return callback(err);
    }

    console.log('文件下载成功');
    callback(null);
  });
}

// html文件保存为marked文件
async function saveHtmltoMarked(title, content) {
  try {
    // 将内容格式化为Markdown
    const markdownContent = `# ${title}\n\n${content}`;

    // 将Markdown内容保存到文件
    const filename = `${title}.md`;
    fs.writeFileSync(filename, markdownContent, 'utf8');
    console.log(`文件保存为: ${filename}`);
  } catch (error) {
    console.error('错误:', error.message);
    throw error;
  }
}

async function saveHtmltoFile(title, content) {
  try {
    // 将内容格式化为Markdown
    const filename = `${title}.html`;

    // 将Markdown内容保存到文件
    fs.writeFileSync(filename, content, 'utf8');
  } catch (error) {
    console.error('错误:', error.message);
    throw error;
  }
}

module.exports = { saveReqToFile, saveHtmltoMarked, saveHtmltoFile };
