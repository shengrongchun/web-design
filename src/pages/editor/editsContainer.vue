<template>
  <div class="editsContainer">
    <el-tabs v-model="activeName">
      <el-tab-pane :label="tabs.key"
                   :key="idx"
                   v-for="(tabs,idx) in tabsList"></el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeName: '0',
      tabsList: [],
      activeComp: {},
      VM: {}
    }
  },
  watch: {
    '$store.state.activeComp': {
      handler() {
        this.setM()
      }
    }
  },
  methods: {
    setM() {
      const { compsVm, activeComp } = this.$store.state;
      this.activeComp = activeComp
      this.VM = compsVm[activeComp.i]
      console.log('VM', this.VM)
      console.log('comp', this.activeComp)
    }
  }
};
</script>
<style scoped lang="less">
.editsContainer {
  height: 100%;
}
</style>