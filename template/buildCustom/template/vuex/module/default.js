var _ = require('lodash/core');
var fp = require('lodash/fp');
module.exports = (ajaxModule) => {
  let ajaxCont = '';
  let actionCont = '';
  let actionTypes = '';
  if (_.isArray(ajaxModule)) {
    ajaxModule.forEach((v) => {
      let ajaxName = `${v}_AJAX`
      ajaxCont += `, ${ajaxName}`;
      actionTypes += `, ${v}`;
      actionCont += `,\n    [${v}]({ commit, state }, payload){
      return ${ajaxName}(payload)
    }`
    })
  }
  let ajaxImp = ajaxCont.slice(2) == '' ? '' : `import { ${ajaxCont.slice(2)} } from '@/ajax'`;
  let cont = `import {} from '../mutation-types.js'
import { ${actionTypes.slice(2)} } from '../action-types.js'
${ajaxImp}

export default {
  namespaced: true,
  state: {
    
  },
  mutations: {
    
  },
  actions: {
${actionCont.slice(2)}
  }
}
  `;
  return cont
}
