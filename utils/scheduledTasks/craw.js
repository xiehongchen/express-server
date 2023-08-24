const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const { saveHtmltoFile } = require('./../reqToFile');

// 爬取函数
async function crawlVideos() {
  try {
    const response = await axios.get('https://api.bilibili.com/x/web-interface/newlist');
    const videos = response.data.data.archives;
    saveReqToFile(videos, 'req.json', () => { })
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

// 爬取文章
async function crawlAndParseArticle(url) {
  try {
    // 发送HTTP GET请求到文章的URL
    const response = await axios.get(url);

    // 使用cheerio加载HTML内容
    const $ = cheerio.load(response.data);
    // 提取文章的标题和内容
    if (url.includes('juejin')) {
      const title = $('h1').text().trim().split('\n')[0];
      // saveHtmltoFile(`${title}.html`, response.data)
      // const content = $('.article').html(); // 文章内容在class为"article"的元素内
      const author = $('.name').text().trim().split('\n')[0];
      return { title, author };
    }
    if (url.includes('cnblogs')) {
      const title = $('title').text().trim().split('-')[0];
      const author = $('title').text().trim().split('-')[1];
      console.log(author)
      return { title, author };
    }
  } catch (error) {
    console.error('错误:', error.message);
    throw error;
  }
}

module.exports = {
  crawlAndParseArticle
};