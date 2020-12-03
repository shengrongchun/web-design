<template>
  <div class="menu-comp">
    menu
  </div>
</template>
<script>
import { compInfo, install } from './config'
export default {
  name: 'menuComp',
  $$compInfo: compInfo,
  created() {
    install(this)
  }
}
</script>
<style scoped lang="less">
.menu-comp {
}
</style>