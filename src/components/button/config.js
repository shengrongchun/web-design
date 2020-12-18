function install(vm) {
  //所有的key请务必在组件中的data里面定义
  vm.$$Config = {
    //设置样式的配置项目
    '样式设置': [{
      title: '按钮名称:',
      type: 'Input',
      key: 'label',
    }]
  }
}
const compInfo = {
  title: '按钮组件',
}
export {
  install,
  compInfo
}