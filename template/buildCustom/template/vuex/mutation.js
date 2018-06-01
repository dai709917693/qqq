const fs = require('fs');
const path = require('path');
module.exports = (folderAdd) => {
  let mutationCont = '';
  let mutationAdd = path.resolve(folderAdd, 'mutation-types.js');
  !fs.existsSync(mutationAdd) && fs.writeFileSync(mutationAdd, mutationCont);
}