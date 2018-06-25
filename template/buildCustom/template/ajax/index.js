const fs = require('fs');
const path = require('path');
const url = require('url');
const initReq = require('./request');
const initReqLocal = require('./requestLocal');
const initDataLocal = require('./DataLocal');

var Handlebars = require('handlebars');
const initIndex = (ajaxListCont, folderAdd) => {
  let indexCont = `import {\n{{#each list}}\t{{this}},\n{{/each}}\n} from './request';
/*import {\n{{#each list}}\t{{this}},\n{{/each}}\n} from './requestLocal';*/
export {\n{{#each list}}\t{{this}},\n{{/each}}\n}`;
  let template = Handlebars.compile(indexCont);
  let indexAdd = path.resolve(folderAdd, 'index.js');
  fs.writeFileSync(indexAdd, template(ajaxListCont));
}
module.exports = (data, folderAdd) => {
  //初始化DataLocal
  let dataLocalAdd = path.resolve(folderAdd, 'DataLocal');
  !fs.existsSync(dataLocalAdd) && fs.mkdirSync(dataLocalAdd);
  let ajaxList = [];
  data.forEach((value) => {
    let ajaxName;
    if (value.name) {
      ajaxName = value.name
    } else {
      let urlPath = url.parse(value.url).pathname;
      ajaxName = path.parse(urlPath).name.toLocaleUpperCase();
    }
    ajaxList.push(`${ajaxName}_AJAX`);
    //创建data文件
    initDataLocal(ajaxName, dataLocalAdd);
  });

  initIndex({ list: ajaxList }, folderAdd);
  initReq(data, folderAdd);
  initReqLocal(data, folderAdd);
}