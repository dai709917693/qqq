const fs = require('fs');
const path = require('path');
const initDefault = require('./default');
const modify = require('./modify');

module.exports = (name, ajaxModule, folderAdd) => {
  let add = path.resolve(folderAdd, `${name}.js`);
  if (fs.existsSync(add)) {
    let oldData = fs.readFileSync(add, { encoding: 'utf8' });
    let newCont = modify(oldData, ajaxModule);
    fs.writeFileSync(add, newCont)
  } else {
    let defCont = initDefault(ajaxModule);
    fs.writeFileSync(add, defCont)
  }
}
