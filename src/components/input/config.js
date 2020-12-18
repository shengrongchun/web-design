function install(vm) {
  //所有的key请务必在组件中的data里面定义
  vm.$$Config = {
    //设置样式的配置项目
    '样式设置': [{
      title: '标题:',
      type: 'Input',
      key: 'label',
    }, {
      title: 'placeholder:',
      type: 'Input',
      key: 'placeholder',
    }, {
      title: '对外输出参数名:',
      type: 'Input',
      key: 'outKey',
      bindValKey: 'value',//对外输出时，值从哪里获取 如 this.value
    }]
  }
}
const compInfo = {
  title: '输入框组件',
}
export {
  install,
  compInfo
}