<template>
  <div class="header-comp">
    header
  </div>
</template>
<script>
import { compInfo, install } from './config'
export default {
  name: 'headerComp',
  $$compInfo: compInfo,
  created() {
    install(this)
  }
}
</script>
<style scoped lang="less">
.header-comp {
}
</style>