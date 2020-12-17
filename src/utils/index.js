
const setSaveVal = (vm, Config) => {//初始化编辑状态使用
  let list = []
  Object.keys(Config || {}).forEach((key) => {
    list = list.concat(Config[key] || [])
  })
  //
  list.forEach((item) => {
    item.$$saveVal = vm[item.key]
    const stringType = Object.prototype.toString.call(vm[item.key])
    //不能自动响应式
    if (stringType !== '[object Array]' && stringType !== '[object Object]') {
      vm.$watch(() => {
        return vm[item.key]
      }, () => {
        item.$$saveVal = vm[item.key]
      })
    }
  })
}
const getSaveVal = (vm, Config) => {//线上或者预览状态才会用到
  let list = []
  Object.keys(Config).forEach((key) => {
    list = list.concat(Config[key] || [])
  })
  //
  list.forEach((item) => {
    vm[item.key] = item.$$saveVal
  })
}
export {
  setSaveVal,
  getSaveVal
}