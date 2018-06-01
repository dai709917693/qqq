module.exports = (ajaxName, reqName, dataFilename) => {
  return `import ${ajaxName}_DATA from './${dataFilename}/${ajaxName}_DATA';
export const ${ajaxName}_AJAX = () => {
	return ${reqName}(${ajaxName}_DATA)\n};\n`
}