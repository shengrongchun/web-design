function install(vm) {
  vm.$$Config = {
    //设置样式的配置项目
    styleConfig: [{
      title: 'input测试',
      type: 'Input',
      key: 'temp'
    }],
    //设置数据相关的配置项目
    dataConfig: [{
      title: '设置tabs',
      type: 'Add',// Add 类型返回值是数组类型
      key: 'tabsList',
      template: [{//模板
        key: 'label',
        name: 'tab标题',
        default: null
      }, {
        status: 'hidden',//说明不在页面展示编辑，但需要有这样的 children 字段
        key: 'children',
        default: []
      }]
    }],
    //交互事件相关的配置项目
    reactConfig: []
  }
}
const compInfo = {
  title: 'Tabs 标签页组件',
}
export {
  install,
  compInfo
}