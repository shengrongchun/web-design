<template>
  <div class="editsContainer">
    <el-tabs v-model="active">
      <el-tab-pane label="组件配置"
                   key="0">
        <el-switch v-model="$store.state.activeComp.static"
                   inactive-text="静态组件">
        </el-switch>
      </el-tab-pane>
      <el-tab-pane :label="tabs.label"
                   :key="idx+1"
                   v-for="(tabs, idx) in List">
        <DataEditor :list="tabs.data"
                    :VM="VM" />
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
      Object.keys($$Config || {}).forEach((label) => {
        this.List.push({ label, data: $$Config[label] })
      })
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