const fs = require('fs');
const path = require('path');
module.exports = (routerArr, routerDir, data) => {
  let configRouter = "";
  routerArr.forEach((v) => {
    configRouter += JSON.stringify(v)+", "
  })
  let cont = `import Vue from 'vue'\nimport Router from 'vue-router'
${data.routerImp}\nVue.use(Router)
export default new Router({
  routes: [${configRouter}${data.routeCont.slice(2)}]
})`
  fs.writeFileSync(path.resolve(routerDir, 'index.js'), cont)
}