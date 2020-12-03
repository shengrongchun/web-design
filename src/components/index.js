
function install(Vue) {
  //
  const contexts = require.context('./', true, /(index).vue$/);
  contexts.keys().forEach((fileName) => {
    const comp = contexts(fileName).default;
    // 全局注册组件
    Vue.component(comp.name, comp);
  });
}

export default {
  install
}
