const fs = require('fs');
const path = require('path');
const url = require('url');
const initReq = require('./request');
const initReqLocal = require('./requestLocal');
const initDataLocal = require('./DataLocal');
const initIndex = (ajaxListCont, folderAdd) => {
  let indexCont = `import {\n${ajaxListCont}\n} from './request';
/*import {\n${ajaxListCont}\n} from './requestLocal';*/
export {\n${ajaxListCont}\n}`;
  let indexAdd = path.resolve(folderAdd, 'index.js');
  !fs.existsSync(indexAdd) && fs.writeFileSync(indexAdd, indexCont);
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
  let ajaxListCont = ajaxList.join(', \n');
  initIndex(ajaxListCont, folderAdd);
  initReq(data, folderAdd);
  initReqLocal(data, folderAdd);
}