<template>
  <div class="table-comp">
    table
  </div>
</template>
<script>
import { compInfo, install } from './config'
export default {
  name: 'tableComp',
  $$compInfo: compInfo,
  created() {
    install(this)
  }
}
</script>
<style scoped lang="less">
.table-comp {
  background: green;
}
</style>