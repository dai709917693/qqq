const fs = require('fs');
const path = require('path');
const url = require('url');
const requestItem = require('./requestItem.js');
const requestName = 'request';
module.exports = (data, folderAdd) => {
  let reqAdd = path.resolve(folderAdd, 'request.js');
  let reqContent = ""
  if (fs.existsSync(reqAdd)) {
    reqContent = fs.readFileSync(reqAdd, { encoding: 'utf8' });
  } else {
    reqContent = `import ${requestName} from '@/modules/${requestName}';\nimport forEach from 'lodash/forEach';\n`;
  }
  data.forEach((value) => {
    if (reqContent.indexOf(value.url) == -1) {
      let ajaxName;
      if (value.name) {
        ajaxName = value.name
      } else {
        let urlPath = url.parse(value.url).pathname;
        ajaxName = path.parse(urlPath).name.toLocaleUpperCase();
      };
      !value.method && (value.method = 'get');
      reqContent += requestItem(ajaxName, value, requestName)
    }
  });
  fs.writeFileSync(reqAdd, reqContent)
}