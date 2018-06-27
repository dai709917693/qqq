const fs = require('fs');
const path = require('path');
var _ = require('lodash/core');
var fp = require('lodash/fp');
const initModule = require('./module');
const initAction = require('./action');
const initMutation = require('./mutation');
const queryData = require('../../util/queryData')
const modifyIndex = (indexCont, modules) => {
  let exportIndex = indexCont.indexOf('export');
  let partImp = indexCont.substring(0, exportIndex);
  let partExport = indexCont.substring(exportIndex);
  let exportCont = ""
  modules.forEach((value) => {
    if (indexCont.indexOf(`modules/${value}`) == -1) {
      partImp += `import ${value} from './modules/${value}';\n`;
      exportCont += `\n    ${value}, `
    }
  })
  let modulesIndex = partExport.indexOf('modules:');
  partExport = queryData(partExport, exportCont, modulesIndex, true)
  return partImp + partExport
}
const defaultIndex = (indexCont, modules) => {
  let cont = ''
  modules.forEach((value) => {
    cont += `import ${value} from './modules/${value}';\n`;
  })
  cont += `Vue.use(Vuex)
const state = {}
const mutations = {}
const actions = {}
export default new Vuex.Store({
  modules: {
    ${modules.join(', ')}
  },
  state,
  actions,
  mutations
})`;
  return indexCont + cont
}
const initIndex = (modules, folderAdd) => {
  let indexCont = '';
  let indexAdd = path.resolve(folderAdd, 'index.js');
  //检查旧内容
  if (fs.existsSync(indexAdd)) {
    indexCont = fs.readFileSync(indexAdd, { encoding: 'utf8' });
    indexCont = modifyIndex(indexCont, modules)
  } else {
    indexCont = `import Vue from 'vue';\nimport Vuex from 'vuex';\n`;
    indexCont = defaultIndex(indexCont, modules)
  }
  fs.writeFileSync(indexAdd, indexCont);
}
module.exports = (pagesData, ajaxData, folderAdd) => {
  //初始化modules目录
  let modulesAdd = path.resolve(folderAdd, 'modules');
  !fs.existsSync(modulesAdd) && fs.mkdirSync(modulesAdd);
  //遍历ajax配置，分类属于的模块
  let ajaxModules = {};
  ajaxData.forEach((aVal) => {
    if (aVal.vuex) {
      !ajaxModules[aVal.vuex] && (ajaxModules[aVal.vuex] = []);
      ajaxModules[aVal.vuex].push(aVal.name)
    }
  })
  let modules = [];
  pagesData.forEach((value) => {
    if (_.isUndefined(value.base)) {
      value.base = value.name + (value.ext ? value.ext : '')
    }
    let pathObj = path.parse(value.base);
    modules.push(pathObj.name);
    //创建modules
    initModule(pathObj.name, ajaxModules[pathObj.name], modulesAdd)
  });
  initIndex(modules, folderAdd);
  initAction(ajaxModules, folderAdd);
  initMutation(folderAdd);
}