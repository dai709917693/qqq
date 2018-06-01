const fs = require('fs');
const path = require('path');
var _ = require('lodash/core');
var fp = require('lodash/fp');
const initModule = require('./module');
const initAction = require('./action');
const initMutation = require('./mutation');

const initIndex = (modules, folderAdd) => {
  let indexCont = `import Vue from 'vue';\nimport Vuex from 'vuex';\n`;
  modules.forEach((value) => {
    indexCont += `import ${value} from './modules/${value}';\n`;
  })
  indexCont += `Vue.use(Vuex)
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
  let indexAdd = path.resolve(folderAdd, 'index.js');
  !fs.existsSync(indexAdd) && fs.writeFileSync(indexAdd, indexCont);
}
module.exports = (data, folderAdd) => {
  //初始化modules目录
  let modulesAdd = path.resolve(folderAdd, 'modules');
  !fs.existsSync(modulesAdd) && fs.mkdirSync(modulesAdd);
  let modules = [];
  data.forEach((value) => {
    if (_.isUndefined(value.base)) {
      value.base = value.name + (value.ext ? value.ext : '')
    }
    let pathObj = path.parse(value.base);
    modules.push(pathObj.name);
    //创建modules
    initModule(pathObj.name, modulesAdd)
  });
  initIndex(modules, folderAdd);
  initAction(folderAdd);
  initMutation(folderAdd);
}