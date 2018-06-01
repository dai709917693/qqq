const fs = require('fs');
const path = require('path');
module.exports = (folderAdd) => {
  let actionCont = '';
  let actionAdd = path.resolve(folderAdd, 'action-types.js');
  !fs.existsSync(actionAdd) && fs.writeFileSync(actionAdd, actionCont);
}