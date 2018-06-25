var _ = require('lodash/core');
var fp = require('lodash/fp');
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
    let queryData = (data, cont, index, isStart) => {
      let staIndex;
      let endIndex;
      if (isStart) {
        staIndex = data.indexOf("{", index);
        endIndex = data.indexOf("}", index);
      } else {
        staIndex = data.lastIndexOf("{", index);
        endIndex = data.lastIndexOf("}", index);
      }
      //若填入部分内容为空
      if (!data.substring(staIndex + 1, endIndex).replace(/\s+/g, "")) {
        cont = cont.slice(1)
      }
      if (isStart) {
        console.log(cont)
        return data.substring(0, staIndex + 1) + cont + data.substring(staIndex + 1);
      } else {
        return data.substring(0, endIndex) + cont + ' ' + newData.substring(endIndex);
      }
    }
    let actionTypesIndex = newData.indexOf('../action-types.js');
    newData = queryData(newData, actionTypes, actionTypesIndex)

    let ajaxIndex = newData.indexOf('@/ajax');
    newData = queryData(newData, ajaxCont, ajaxIndex)

    let actionIndex = newData.indexOf('actions:');
    newData = queryData(newData, actionCont, actionIndex, true)
  }
  return newData
}