const fs = require('fs');
const path = require('path');
module.exports = (ajaxName, folderAdd) => {
  let addData = path.resolve(folderAdd, `${ajaxName}_DATA.js`);
  let defCont = 'export default {}';
  !fs.existsSync(addData) && fs.writeFileSync(addData, defCont);
}