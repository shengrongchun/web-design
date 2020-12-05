import { addRoutes } from '../router'
export default {
  state: {
    colNum: 24, // 行分多少栅格
    rowHeight: 10, // 一列每个栅格多少px
    onLine: false,//线上模式
    preview: false,//预览状态
    activeComp: {},//选中组件
    compList: [], // 组件列表
    compsVm: {},//组件列表对应的实例对象哈希
  },
  mutations: {
    previewChange(state, val) {//更改预览状态
      state.preview = val
    },
    changeActiveComp(state, val) {//更改选中组件
      state.activeComp = val
    },
    addCompsVm(state, { VM, i }) {//增加组件对应的实例
      state.compsVm[i] = VM
    },
    saveCompList(state) {//保存事件
      const tempData = JSON.stringify(state.compList)
      window.localstorage.setItem('web-design', tempData)
      alert('保存成功')
    },
    onLineChange(state, VM) {
      state.onLine = true
      state.preview = true
      //
      const tempData = JSON.parse(window.localstorage.getItem('web-design'))
      console.log('tempData', tempData)
      state.compList = tempData || []
      addRoutes(VM, state.compList)//初始化注册路由
    },
    addComp(state, { type, title, list }) { // 增加组件方法
      const comp = {
        x: 0, y: 0, i: Date.now(), w: 12, h: 12, type, title, children: []
      }
      state.activeComp = comp
      list.unshift(comp)
    },
  }
}