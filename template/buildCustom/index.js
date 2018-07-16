const fs = require('fs');
const path = require('path');
const config = require('./config');

const ajaxConfig = path.resolve(__dirname, './config/ajax.json');
const pagesConfig = path.resolve(__dirname, './config/pages.json');
const routerConfig = path.resolve(__dirname, './config/router.json');

const initAjax = require('./template/ajax')
const initPages = require('./template/pages');
const initVuex = require('./template/vuex');

const vueTpl = fs.readFileSync(path.resolve(__dirname, './template/tpl.vue'), { encoding: 'utf8' });
//初始化ajax目录
!fs.existsSync(config.ajaxSrc) && fs.mkdirSync(config.ajaxSrc);
//初始化pages目录
!fs.existsSync(config.pagesSrc) && fs.mkdirSync(config.pagesSrc);
//初始化vuex目录
!fs.existsSync(config.vuexSrc) && fs.mkdirSync(config.vuexSrc);
//初始化router目录
!fs.existsSync(config.routerSrc) && fs.mkdirSync(config.routerSrc);

const readdir = (dir) => {
  let obj = {}
  let files = fs.readdirSync(dir);
  obj.name = path.parse(dir).name;
  obj.children = []
  files.forEach((v) => {
    let subPath = path.resolve(dir, v);
    let subStat = fs.statSync(subPath);
    if (subStat.isDirectory()) {
      obj.children.push(readdir(subPath))
    } else {
      v != 'index.js' && obj.children.push({ base: v })
    }

  })
  return obj
}
//console.log(JSON.stringify(readdir(config.pagesSrc)))
//fs.writeFileSync(watcherDir, JSON.stringify(readdir('./config')))
let ajaxData;
let ajaxDataObj;
let pagesData;
let pagesDataObj;
let routerData;
let routerDataObj;
ajaxData = fs.readFileSync(ajaxConfig, { encoding: 'utf8' });
ajaxDataObj = JSON.parse(ajaxData);
pagesData = fs.readFileSync(pagesConfig, { encoding: 'utf8' });
pagesDataObj = JSON.parse(pagesData);
routerData = fs.readFileSync(routerConfig, { encoding: 'utf8' });
routerDataObj = JSON.parse(routerData);
switch (process.argv.splice(2)[0]) {
  case 'ajax':
    initAjax(ajaxDataObj, config.ajaxSrc);
    break;
  case 'pages':
    initPages(pagesDataObj, config.pagesSrc, routerDataObj, config.routerSrc, vueTpl);
    let newPagesDataObj = readdir(config.pagesSrc).children;
    //重写pages.json配置
    fs.writeFileSync(pagesConfig, JSON.stringify(newPagesDataObj))
    initPages(newPagesDataObj, config.pagesSrc, routerDataObj, config.routerSrc, vueTpl);
    break;
  case 'vuex':
    initVuex(pagesDataObj, ajaxDataObj, config.vuexSrc)
}