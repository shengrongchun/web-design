<template>
  <div class="editsContainer">
    <el-tabs v-model="activeName">
      <el-tab-pane :label="tabs.key"
                   :key="idx"
                   v-for="(tabs, idx) in List">{{VM.tabsList}}
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeName: "0",
      List: [],
      activeComp: {},
      VM: {},
    };
  },
  watch: {
    "$store.state.activeComp": {
      handler({ i }) {
        //空对象或者相同选中组件不需要再次执行
        if (!i || (this.activeComp.i === i)) return
        this.setM();
      },
    },
  },
  methods: {
    setM() {
      const { compsVm, activeComp } = this.$store.state;
      this.activeName = "0";
      this.List = [];
      this.activeComp = activeComp;
      this.VM = compsVm[activeComp.i];
      //
      const { $$Config } = this.activeComp;
      if ($$Config) {
        const { styleConfig, dataConfig, reactConfig } = $$Config;
        if (styleConfig) {
          this.List.push({ key: "样式设置" });
        }
        if (reactConfig) {
          this.List.push({ key: "交互设置" });
        }
        if (dataConfig) {
          this.List.push({ key: "数据设置" });
        }
      }
      console.log("VM", this.VM);
      console.log("comp", this.activeComp);
    },
  },
};
</script>
<style scoped lang="less">
.editsContainer {
  height: 100%;
}
</style>