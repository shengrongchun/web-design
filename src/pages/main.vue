<template>
  <div class="main">
    <DragContainer :list="$store.state.compList" />
  </div>
</template>
<script>
import DragContainer from './common/dragContainer'
export default {
  components: {
    DragContainer
  }
}
</script>
<style scoped lang="less">
.main {
  flex: 9;
}
</style>