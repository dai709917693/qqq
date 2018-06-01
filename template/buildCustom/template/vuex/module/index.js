const fs = require('fs');
const path = require('path');
const initDefault = require('./default');

module.exports = (name, folderAdd) => {
  let add = path.resolve(folderAdd, `${name}.js`);
  let defCont = initDefault();
  !fs.existsSync(add) && fs.writeFileSync(add, defCont)
}