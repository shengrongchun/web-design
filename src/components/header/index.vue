<template>
  <div class="header-comp">
    <div>中通科技</div>
    <div>退出</div>
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
  color: hsla(0, 0%, 100%, 0.8);
  background: linear-gradient(315deg, #5430ff, #3693ff);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  font-size: 13px;
}
</style>