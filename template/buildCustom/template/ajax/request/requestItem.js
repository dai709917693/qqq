module.exports = (ajaxName, urlValue, requestName, method) => {
  let isPost = method.toLocaleLowerCase() == 'post';
  return `export const ${ajaxName}_AJAX = (params) => {
	return request({
    	url:'${urlValue}',
    	method:'${method}',
    	${isPost?'data:':''}params
    })\n};\n`
}