import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import { Button, Card, Input, Tree } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import Store from './store'
import ToRouterView from './pages/common/routerView'
import dragComps from './components'

Vue.config.productionTip = false
//全局注册router-view容器
Vue.component(ToRouterView.name, ToRouterView)
//注册全局拖拉组件
Vue.use(dragComps)

//全局设置element-ui组件大小和弹框的z-index,默认是2000
Vue.prototype.$ELEMENT = { size: 'mini', zIndex: 3000 }
//注册全局element-ui组件
Vue.component(Button.name, Button)
Vue.component(Card.name, Card)
Vue.component(Input.name, Input)
Vue.component(Tree.name, Tree)

//store
Vue.use(Vuex)
const store = new Vuex.Store(Store)
//添加路由功能
Vue.use(VueRouter)
const router = new VueRouter({
  routes: []
})
//收集组件vm实例放入compsVm中
Vue.mixin({
  created() {
    if (this.$attrs.COMP) {//拖拽组件标识-可以查看dragContainer组件
      this.$store.commit('addCompsVm', { VM: this, i: this.$attrs.COMP.i })
    }
  }
})
//
new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')