<template>
  <div class="editsContainer">
    <el-switch
      v-model="$store.state.activeComp.static"
      inactive-text="静态组件"
    >
    </el-switch>
    <el-tabs v-model="active">
      <el-tab-pane :label="tabs.label" :key="idx" v-for="(tabs, idx) in List">
        <DataEditor :list="tabs.data" :VM="VM" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import DataEditor from "./commonComps/dataEditor";
export default {
  data() {
    return {
      active: "0",
      List: [],
      activeComp: {},
      VM: {},
    };
  },
  components: {
    DataEditor,
  },
  watch: {
    "$store.state.activeComp": {
      handler({ i }) {
        //空对象或者相同选中组件不需要再次执行
        if (!i || this.activeComp.i === i) return;
        this.setTabs();
      },
    },
  },
  methods: {
    setTabs() {
      const { compsVm, activeComp } = this.$store.state;
      this.active = "0";
      this.List = [];
      this.activeComp = activeComp;
      this.VM = compsVm[activeComp.i];
      //
      const { $$Config } = this.activeComp;
      if ($$Config) {
        const { styleConfig, dataConfig, reactConfig } = $$Config;
        if (styleConfig) {
          this.List.push({ label: "样式设置", data: styleConfig });
        }
        if (reactConfig) {
          this.List.push({ label: "交互设置", data: reactConfig });
        }
        if (dataConfig) {
          this.List.push({ label: "数据设置", data: dataConfig });
        }
      }
    },
  },
};
</script>
<style scoped lang="less">
.editsContainer {
  height: 100%;
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