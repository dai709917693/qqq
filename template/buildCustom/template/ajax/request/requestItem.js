module.exports = (ajaxName, data) => {
  let isPost = data.method.toLocaleLowerCase() == 'post';
  let option;
  let params;
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
  return `export const ${ajaxName}_AJAX = (params) => {
	return request(${option})\n};\n`
}
