const express = require('express');
const multer = require('multer');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const saveReqToFile = require('../utils/reqToFile');
// 创建存储上传文件的配置
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let uploadPath = '';
    if (file.fieldname === 'chunk') {
      uploadPath = 'uploads/temp';
    }
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      uploadPath = 'uploads/images';
    } else if (file.mimetype === 'application/pdf') {
      uploadPath = 'uploads/pdfs';
    }else if (file.mimetype === 'text/markdown') {
      uploadPath = 'uploads/markdown';
    } 
    cb(null, uploadPath);
  }, 
  filename: function (req, file, cb) {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    const formattedDateTime = `${year}${month}${day}${hours}${minutes}${seconds}`;
    // 生成文件名
    const uniqueSuffix = formattedDateTime + '-' + Math.round(Math.random() * 1E9);
    const extension = file.originalname.split('.').pop();
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + extension);
  }
});

// 创建Multer实例
const upload = multer({ 
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 设置文件大小限制为 10MB
  } 
});
// 示例路由处理程序，处理上传文件请求
router.post('/upload', upload.any(), (req, res) => {
  // 获取上传的文件信息
  const file = req.files;

  if (!file) {
    // 如果没有上传文件，则返回错误响应
    res.status(400).json({ error: 'No file uploaded' });
  } else {
    // 如果上传成功，将文件路径存储在数据库中，或进行其他处理
    const filePath = file[0].path;
    res.json({ filePath: filePath });
  }
});

router.post('/upload2', upload.single('chunk'), (req, res) => {
  saveReqToFile(req, 'req.json', () => {})
  const file = req.file;
  if (!file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  // 处理文件保存等逻辑
  // 这里可以根据需求将文件保存到指定路径，合并分块文件等操作

  res.status(200).json({ message: 'File uploaded successfully' });
});

router.post('/merge', upload.single('chunk'), (req, res) => {
  saveReqToFile(req, 'req.json', () => {})
  saveReqToFile(req.body, 'req.body.json', () => {})
  const file = req.file;
  const chunkIndex = req.body.chunkIndex;
  const totalChunks = req.body.totalChunks;
  const originalFilename = req.body.originalFilename;

  console.log('__dirname', __dirname)
  const uploadDir = path.join(__dirname, '../uploads');
  const tempDir = path.join(__dirname, '../uploads/temp');
  console.log('uploadDir', uploadDir)

  // 按照文件名创建目录
  const uploadDirPath = path.join(uploadDir, originalFilename);
  if (!fs.existsSync(uploadDirPath)) {
    fs.mkdirSync(uploadDirPath);
  }

  // // 将临时文件移动到目标目录
  const tempFilePath = path.join(tempDir, file.filename);
  const targetFilePath = path.join(uploadDirPath, chunkIndex.toString());
  fs.renameSync(tempFilePath, targetFilePath);
  console.log(fs.readdirSync(uploadDirPath).length)

  // // 检查是否所有块都已上传
  const uploadedChunks = fs.readdirSync(uploadDirPath);
  if (uploadedChunks.length === Number(totalChunks)) {
    // 合并所有块为完整文件
    const finalFilePath = path.join(uploadDir, originalFilename);
    for (let i = 0; i < totalChunks; i++) {
      const chunkPath = path.join(uploadDirPath, i.toString());
      const chunkData = fs.readFileSync(chunkPath);
      fs.appendFileSync(finalFilePath, chunkData);
      fs.unlinkSync(chunkPath); // 删除已合并的块文件
    }

    // 删除临时目录
    fs.rmdirSync(uploadDirPath);
  }

  res.sendStatus(200);
});

module.exports = router;
