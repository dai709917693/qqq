const fs = require('fs');
const path = require('path');
const url = require('url');
const reqLocalItem = require('./requestLocalItem.js');
const reqName = 'sendRes';
const dataFilename = 'DataLocal';
module.exports = (data, folderAdd) => {
  let reqLocalAdd = path.resolve(folderAdd, 'requestLocal.js');
  let reqLocalCont = "";
  if (fs.existsSync(reqLocalAdd)) {
    reqLocalCont = fs.readFileSync(reqLocalAdd, { encoding: 'utf8' });
  } else {
    reqLocalCont = `const ${reqName} = (res) => {
  return new Promise((resolve, reject) => {
    resolve(res)
  })
};\n`;
  }
  data.forEach((value) => {
    let ajaxName;
    if (value.name) {
      ajaxName = value.name
    } else {
      let urlPath = url.parse(value.url).pathname;
      ajaxName = path.parse(urlPath).name.toLocaleUpperCase();
    }
    if (reqLocalCont.indexOf(ajaxName) == -1) {
      reqLocalCont += reqLocalItem(ajaxName, reqName, dataFilename)
    }
  });

  fs.writeFileSync(reqLocalAdd, reqLocalCont);
}