<template>
  <div class="tabs-comp">
    <el-tabs v-model="activeName">
      <el-tab-pane :label="tabs.key"
                   :key="idx"
                   v-for="(tabs,idx) in tabsList"></el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { compInfo, install } from './config'
import {
  Tabs,
  TabPane,
} from 'element-ui'
export default {
  name: 'tabsComp',
  $$compInfo: compInfo,
  components: {
    [Tabs.name]: Tabs,
    [TabPane.name]: TabPane,
  },
  created() {
    install(this)
  },
  data() {
    return {
      activeName: '0',
      tabsList: [],
      // tabsList: [{
      //   key: '用户管理',
      //   value: 'first'
      // }, {
      //   key: '配置管理',
      //   value: 'second'
      // }, {
      //   key: '角色管理',
      //   value: 'third'
      // }]
    }
  }
}
</script>
<style scoped lang="less">
.tabs-comp {
}
</style>