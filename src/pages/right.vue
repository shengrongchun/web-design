<template>
  <div class="right">
    <views v-if="$store.state.activeComp.type==='to-router-view'" />
  </div>
</template>
<script>
import Views from './dialogs/views'
export default {
  components: {
    Views
  }
}
</script>
<style scoped lang="less">
.right {
  flex: 3;
  background: #fff;
}
</style>