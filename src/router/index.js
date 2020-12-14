
import VueRouter from 'vue-router'
import DragContainer from '../pages/lib/dragContainer'
import NoFound from '../pages/lib/noFound'


// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const routes = {
  mode: 'history',
  routes: [{
    name: '404',
    path: '*',
    component: NoFound
  }]
}
//
const setDeepRoutes = (list, routes) => {
  list.forEach(item => {
    const { type, path, children } = item
    if (type === 'to-router-page') {//页面类型
      const subChildren = []
      routes.push({
        path,
        component: DragContainer,
        props: { list: children },
        children: subChildren
      })
      //递归
      if (children.length) {
        setDeepRoutes(children, subChildren)
      }
    } else if (type === 'to-router-view') {
      setDeepRoutes(children, routes)
    }
  })
}
//动态添加路由
const addRoutes = (vm, list) => {
  const dYroutes = []
  setDeepRoutes(list, dYroutes)
  vm.$router.matcher = new VueRouter(dYroutes).matcher
  vm.$router.addRoutes(routes.routes.concat(dYroutes))
}
export { routes, addRoutes }