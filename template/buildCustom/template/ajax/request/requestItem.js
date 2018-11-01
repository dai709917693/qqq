module.exports = (ajaxName, data, requestName) => {
  let isPost = data.method.toLocaleLowerCase() == 'post';
  let option;
  let params;
  let urlPath = data['url']
  delete data['url']
  if (isPost) {
    if (data['data']) {
      params = JSON.stringify(data['data'])
      delete data['data']
      option = JSON.stringify(data)
      option = option.substring(0, option.length - 1) + `,"data": Object.assign(${params}, params)}`
    } else {
      option = JSON.stringify(data);
      option = option.substring(0, option.length - 1) + ',"data": params}'
    }
  } else {
    if (data['params']) {
      params = JSON.stringify(data['params'])
      delete data['params']
      option = JSON.stringify(data)
      option = option.substring(0, option.length - 1) + `,"params": Object.assign(${params}, params)}`
    } else {
      option = JSON.stringify(data)
      option = option.substring(0, option.length - 1) + ',params }'
    }
  }
  let variableUrl = 'url'
  option = `{"url":${variableUrl}, ${option.substring(1)}`
  return `export const ${ajaxName}_AJAX = (params, urlParams) => {
	var ${variableUrl} = "${urlPath}";
  urlParams && forEach(urlParams, (v, k)=>{
    ${variableUrl} = ${variableUrl}.replace('{'+ k +'}', v)
  })
  return ${requestName}(${option})\n};\n`
}
