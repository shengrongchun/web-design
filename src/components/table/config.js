function install(vm) {
  vm.$$Config = {
    //设置样式的配置项目
    styleConfig: [{

    }],
    //设置数据相关的配置项目
    dataConfig: [{

    }]
  }
}
const compInfo = {
  title: '表格组件',
  img: require('./table.jpg')
}
export {
  install,
  compInfo
}