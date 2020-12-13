
import VueRouter from 'vue-router'
import DragContainer from '../pages/lib/dragContainer'

const routes = {
  mode: 'history',
  routes: []
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
  const routes = []
  setDeepRoutes(list, routes)
  vm.$router.matcher = new VueRouter(routes).matcher
  vm.$router.addRoutes(routes)
}
export { routes, addRoutes }