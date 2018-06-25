const fs = require('fs');
const path = require('path');
var _ = require('lodash/core');
var fp = require('lodash/fp');
module.exports = (ajaxModules, folderAdd) => {
  let actionCont = '';
  let actionAdd = path.resolve(folderAdd, 'action-types.js');

  //检查旧内容
  if (fs.existsSync(actionAdd)) {
    actionCont = fs.readFileSync(actionAdd, { encoding: 'utf8' });
  }
  _.forEach(ajaxModules, (arr) => {
    arr.forEach((v) => {
      if (actionCont.indexOf(v) == -1) {
        actionCont += `\nexport const ${v} = '${v}';`
      }
    })
  });
  fs.writeFileSync(actionAdd, actionCont);
}
