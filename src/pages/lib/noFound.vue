
<template>
  <div class="no-found">
    <div class="img-404"><img :src="noFoundPic"
           alt="404"></div>
    <div class="img-bg"><img :src="bgPic"
           alt="背景图"></div>
  </div>
</template>
<script>
import noFoundPic from '../img/404.png'
import bgPic from '../img/home.png'
export default {
  data() {
    return {
      noFoundPic,
      bgPic,
    }
  }
}
</script>
<style scoped lang="less">
.no-found {
  position: relative;
  .img-404,
  .img-bg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
