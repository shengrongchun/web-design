import { addRoutes } from '../router'
export default {
  state: {
    colNum: 75, // 行分多少栅格
    rowNum: 50, // 列分多少栅格
    mode: 'edit',//模式 编辑：edit 预览：preview 线上 online
    activeComp: {},//选中组件
    compList: [], // 组件列表
    compsVm: {},//组件列表对应的实例对象哈希
  },
  mutations: {
    modeChange(state, val) {//更改mode状态
      state.mode = val
    },
    changeActiveComp(state, val) {//更改选中组件
      state.activeComp = {}//这是为了当组件配置弹框人为关闭，再次点击选中组件无法出来组件配置弹框
      state.activeComp = val
    },
    addCompsVm(state, { VM, i }) {//增加组件对应的实例
      state.compsVm[i] = VM
    },
    saveCompList(state) {//保存事件
      const tempData = JSON.stringify(state.compList)
      window.localStorage.setItem('web-design', tempData)
      alert('保存成功')
    },
    onLineChange(state, VM) {
      state.mode = 'online'
      //
      const tempData = JSON.parse(window.localStorage.getItem('web-design'))
      console.log('tempData', tempData)
      state.compList = tempData || []
      addRoutes(VM, state.compList)//初始化注册路由
    },
    addComp(state, { type, title, list, x, y }) { // 增加组件方法
      const comp = {
        x, y, i: Date.now(), w: 30, h: 10, type, title, children: []
      }
      list.push(comp)
    },
  }
}