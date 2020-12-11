<template>
  <div class="drawerContainer"
       v-show="value"
       ref="el">
    <div @mousedown.stop="onMousedown"
         class="moveContainer"
         @mouseup.stop.prevent="onMouseup"
         @mousemove.stop.prevent="onMousemove"
         :style="{ right: value ? 0 : '-100%'}">
      <i @click="onClose"
         class="el-icon-close"></i>
      <slot />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    this.ele = this.$refs.el
  },
  methods: {
    onMousedown(e) {
      this.move = true
      this.xLeft = e.clientX - this.ele.offsetLeft
    },
    onMouseup() {
      this.move = false
    },
    onMousemove(e) {
      if (this.move) {
        let left = e.clientX - this.xLeft
        const width = window.innerWidth - this.ele.offsetWidth
        left = left < 0 ? 0 : left
        left = left > width ? width : left
        this.ele.style.left = left + 'px'
      }
    },
    onClose() {//关闭弹框
      this.$emit('input', false)
    },
  },
}
</script>
<style scoped lang="less">
.drawerContainer {
  padding: 0 10px;
  box-sizing: border-box;
  overflow: hidden;
  z-index: 1000;
  position: fixed;
  top: 40px;
  bottom: 0;
  background: #fff;
  width: 30%;
  resize: horizontal;
  box-shadow: 0 8px 5px -5px rgba(0, 0, 0, 0.2),
    0 16px 10px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12);
  transition: right 0.4s ease;
  .el-icon-close {
    cursor: pointer;
    position: absolute;
    right: 5px;
    top: 5px;
  }
  .moveContainer {
    padding: 20px 0;
    height: 100%;
    box-sizing: border-box;
  }
}
</style>