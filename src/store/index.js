export default {
  state: {
    colNum: 24, // 行分多少栅格
    rowHeight: 10, // 一列每个栅格多少px
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
    addComp(state, { type, title, list }) { // 增加组件方法
      const comp = {
        x: 0, y: 0, i: Date.now(), w: 12, h: 12, type, title, children: []
      }
      state.activeComp = comp
      list.unshift(comp)
    },
  }
}