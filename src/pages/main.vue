<template>
  <div class="main">
    <DragContainer :list="list" />
  </div>
</template>
<script>
import DragContainer from "./lib/dragContainer";
export default {
  components: {
    DragContainer,
  },
  props: {
    list: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>
<style scoped lang="less">
.main {
  height: 100%;
}
</style>