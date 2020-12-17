import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import {
  Button, Card, Input, Tree, Dialog, Form, FormItem, MessageBox, Tabs,
  TabPane, Switch
} from 'element-ui'
import App from './App.vue'
import Store from './store'
import { routes } from './router'
//
import dragComps from './components'
//
import { setSaveVal, getSaveVal } from './utils/index'

Vue.config.productionTip = false

//注册全局拖拉组件
Vue.use(dragComps)

//全局设置element-ui组件大小和弹框的z-index,默认是2000
Vue.prototype.$ELEMENT = { size: 'mini', zIndex: 2000 }
//注册全局element-ui组件
Vue.component(Button.name, Button)
Vue.component(Card.name, Card)
Vue.component(Input.name, Input)
Vue.component(Tree.name, Tree)
Vue.component(Dialog.name, Dialog)
Vue.component(Form.name, Form)
Vue.component(FormItem.name, FormItem)
Vue.component(Tabs.name, Tabs)
Vue.component(TabPane.name, TabPane)
Vue.component(Switch.name, Switch)
Vue.prototype.$alert = MessageBox.alert

//store
Vue.use(Vuex)
const store = new Vuex.Store(Store)

//router
Vue.use(VueRouter)
const router = new VueRouter(routes)

//收集组件vm实例放入compsVm中
Vue.mixin({
  created() {
    if (this.$attrs.COMP) {//拖拽组件标识-可以查看dragContainer组件
      const { i, $$Config } = this.$attrs.COMP
      if (!$$Config) {//新创建项目初始化
        this.$attrs.COMP.$$Config = this.$$Config
        setSaveVal(this, this.$$Config)
      } else {//线上执行操作
        getSaveVal(this, $$Config)
      }
      this.$store.commit('addCompsVm', { VM: this, i })
    }
  }
})
//
new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
