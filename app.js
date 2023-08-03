var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const morgan = require('morgan');
const winston = require('winston');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var homeRouter = require('./routes/home');
var uploadsRouter = require('./routes/uploads');
const cors = require('cors');
const axios = require('axios');
const cron = require('node-cron');
var app = express();
const saveReqToFile = require('./utils/reqToFile');

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(), // 输出到控制台
    new winston.transports.File({ filename: 'logs/app.log' }) // 输出到文件
  ],
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  )
});
const logStream = {
  write: (message) => {
    logger.info(message.trim());
  }
};

// 爬取函数
async function crawlVideos() {
  try {
    const response = await axios.get('https://api.bilibili.com/x/web-interface/newlist');
    const videos = response.data.data.archives;
    saveReqToFile(videos, 'req.json', () => {})
    const videoList = videos.map(video => ({
      aid: video.aid,
      title: video.title,
      author: video.author,
      play: video.play,
    }));
    // saveReqToFile(videoList, 'req.json', () => {})
  } catch (error) {
    console.error('Error fetching video list:', error);
  }
}
// crawlVideos()
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// app.use(logger('dev'));
app.use(morgan('combined', { stream: logStream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// 使用 cors 中间件
app.use(cors());

// 路由
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/home', homeRouter);
app.use('/uploads', uploadsRouter);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  console.log(err)
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
