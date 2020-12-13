<template>
  <div class="editsContainer">edit{{ item.activeComp }}</div>
</template>
<script>
export default {
  computed: {
    item() {
      const { compsVm, activeComp } = this.$store.state;
      return {
        VM: compsVm[activeComp.i],
        activeComp,
      };
    },
  },
};
</script>
<style scoped lang="less">
.editsContainer {
  height: 100%;
}
</style>