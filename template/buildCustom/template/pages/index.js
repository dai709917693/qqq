const fs = require('fs');
const path = require('path');
var _ = require('lodash/core');
var fp = require('lodash/fp');
//返回index.js内容
const writeIndexFile = (original, isChild) => {
  let res = []
  let str = '';
  original.forEach((v) => {
    if (_.isObject(v)) {
      let subfile = writeIndexFile(v.children, true);
      if (isChild) {
        res = res.concat(subfile)
      } else {
        res = res.concat(subfile)
        str += `import { ${subfile.join(', ')} } from './${v.name}';\n`
      }
    } else {
      if (isChild) {
        res.push(v)
      } else {
        res.push(v)
        str += `import ${v} from './${v}';\n`
      }
    }
  })
  if (isChild) {
    return res
  } else {
    return `${str}export { ${res.join(', ')} }`
  }
}
const queryDir = (arr, dir, vueTpl) => {
  let resArr = []
  _.isArray(arr) && arr.forEach((value) => {
    if (_.isUndefined(value.base)) {
      value.base = value.name + (value.ext ? value.ext : '')
    }
    let address = path.resolve(dir, value.base);
    let pathObj = path.parse(value.base);
    let fileExists = fs.existsSync(address);
    if (pathObj.ext) {
      let cont = pathObj.ext == '.vue' ? vueTpl : '';
      resArr.push(pathObj.name);
      !fileExists && fs.writeFileSync(address, cont)
    } else {
      let indexFilePath = path.resolve(address, 'index.js');
      !fileExists && fs.mkdirSync(address);
      let childArr = queryDir(value.children, address, vueTpl);

      let indexContent = writeIndexFile(childArr);
      !fs.existsSync(indexFilePath) && fs.writeFileSync(indexFilePath, indexContent);
      resArr.push({ name: pathObj.name, children: childArr })
    }
  })
  return resArr
}
module.exports = queryDir