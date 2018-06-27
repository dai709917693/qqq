var _ = require('lodash/core');
var fp = require('lodash/fp');
const queryData = require('../../../util/queryData');
module.exports = (oldData, ajaxModule) => {
  let newData = oldData;
  if (_.isArray(ajaxModule)) {
    let ajaxCont = '';
    let actionCont = '';
    let actionTypes = '';
    ajaxModule.forEach((v) => {
      if (newData.indexOf(v) == -1) {
        let ajaxName = `${v}_AJAX`
        ajaxCont += `, ${ajaxName}`;
        actionTypes += `, ${v}`;
        actionCont += `\n    [${v}]({ commit, state }, payload){
      return ${ajaxName}(payload)
    },`
      }
    })
    let actionTypesIndex = newData.indexOf('../action-types.js');
    newData = queryData(newData, actionTypes, actionTypesIndex)

    let ajaxIndex = newData.indexOf('@/ajax');
    newData = queryData(newData, ajaxCont, ajaxIndex)

    let actionIndex = newData.indexOf('actions:');
    newData = queryData(newData, actionCont, actionIndex, true)
  }
  return newData
}