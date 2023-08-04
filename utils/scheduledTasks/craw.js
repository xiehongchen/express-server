const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const { saveHtmltoFile } = require('./../reqToFile');

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

// 爬取文章
async function crawlAndParseArticle(url) {
  try {
    // 发送HTTP GET请求到文章的URL
    const response = await axios.get(url);

    

    // 使用cheerio加载HTML内容
    const $ = cheerio.load(response.data);

    // 提取文章的标题和内容
    const title = $('h1').text().trim();
    saveHtmltoFile(`${title}.html`, response.data)
    const content = $('.article-content').html(); // 假设文章内容在class为"article-content"的元素内

    return { title, content };
  } catch (error) {
    console.error('错误:', error.message);
    throw error;
  }
}

module.exports = crawlAndParseArticle;