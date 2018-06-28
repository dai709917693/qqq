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
    let exportIndex = newData.indexOf('export');

    let actionTypesIndex = newData.indexOf('../action-types.js');
    if (actionTypesIndex == -1) {//添加默认代码
      newData = newData.substring(0, exportIndex) + "import { } from '../action-types.js';\n" + newData.substring(exportIndex);
      actionTypesIndex = newData.indexOf('../action-types.js');
    }
    newData = queryData(newData, actionTypes, actionTypesIndex)

    let ajaxIndex = newData.indexOf('@/ajax');
    if (ajaxIndex == -1) {
      newData = newData.substring(0, exportIndex) + "import { } from '@/ajax';\n" + newData.substring(exportIndex);
      ajaxIndex = newData.indexOf('@/ajax');
    }
    newData = queryData(newData, ajaxCont, ajaxIndex)

    let actionIndex = newData.indexOf('actions:');
    if (actionIndex == -1) {
      let repSp = newData.replace(/\s+/g, "");
      let comma = repSp[repSp.length - 1] == ',' ? "" : ",";
      let endIndex = newData.lastIndexOf('}');
      newData = newData.substring(0, endIndex) + comma + "actions:{ }\n}";
      actionIndex = newData.indexOf('actions:');
    }
    newData = queryData(newData, actionCont, actionIndex, true)
  }
  return newData
}