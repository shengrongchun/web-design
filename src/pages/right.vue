<template>
  <div class="right">
    <viewsContainer v-if="$store.state.activeComp.type === 'to-router-view'" />
  </div>
</template>
<script>
import viewsContainer from "./editor/viewsContainer";
export default {
  components: {
    viewsContainer,
  },
};
</script>
<style scoped lang="less">
.right {
  flex: 3;
  background: #ecf5ff;
}
</style>