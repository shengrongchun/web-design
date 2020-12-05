<template>
  <div class="table-comp">
    table
  </div>
</template>
<script>
import { Table } from 'element-ui'
import { compInfo, install } from './config'
export default {
  name: 'tableComp',
  $$compInfo: compInfo,
  components: {
    [Table.name]: Table
  },
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