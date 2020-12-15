function install(vm) {
  vm.$$Config = {
    //设置样式的配置项目
    styleConfig: [{
      title: '名称',
      type: 'input',
      key: 'name'
    }],
    //设置数据相关的配置项目
    dataConfig: [{

    }],
    //交互事件相关的配置项目
    reactConfig: [{}]
  }
}
const compInfo = {
  title: 'Tabs 标签页组件',
}
export {
  install,
  compInfo
}