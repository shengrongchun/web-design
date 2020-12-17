<template>
  <div class="tabs-comp">
    <el-tabs v-model="activeName">
      <el-tab-pane :label="tabs.label"
                   :key="idx"
                   :lazy="true"
                   v-for="(tabs, idx) in tabsList">
        <slot name="Container"
              :list="tabs.children" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { compInfo, install } from "./config";
import { Tabs, TabPane } from "element-ui";
export default {
  name: "tabsComp",
  $$compInfo: compInfo,
  components: {
    [Tabs.name]: Tabs,
    [TabPane.name]: TabPane,
  },
  beforeCreate() {
    install(this);
  },
  data() {
    return {
      temp: null,
      activeName: "0",
      tabsList: [],
    };
  },
};
</script>
<style scoped lang="less">
.tabs-comp {
  .el-tabs {
    height: 100%;
    display: flex;
    flex-direction: column;
    /deep/ .el-tabs__content {
      flex: 1;
      .el-tab-pane {
        height: 100%;
      }
    }
  }
}
</style>