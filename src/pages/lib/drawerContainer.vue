<template>
  <div
    class="drawerContainer"
    v-show="value"
    ref="el"
    :style="{ right: value ? 0 : '-100%' }"
  >
    <div class="drawer-title">{{ title }}</div>
    <i @click="onClose" class="el-icon-close"></i>
    <div
      @mousedown.stop="onMousedown"
      class="moveContainer"
      @mouseup.stop.prevent="onMouseup"
      @mousemove.stop.prevent="onMousemove"
    >
      <slot />
    </div>
  </div>
</template>
<script>
export default {
  name: "drawerContainer",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "",
    },
  },
  mounted() {
    this.ele = this.$refs.el;
  },
  methods: {
    onMousedown(e) {
      this.move = true;
      this.xLeft = e.clientX - this.ele.offsetLeft;
    },
    onMouseup() {
      this.move = false;
    },
    onMousemove(e) {
      if (this.move) {
        let left = e.clientX - this.xLeft;
        const width = window.innerWidth - this.ele.offsetWidth;
        left = left < 0 ? 0 : left;
        left = left > width ? width : left;
        this.ele.style.left = left + "px";
      }
    },
    onClose() {
      //关闭弹框
      this.$emit("input", false);
    },
  },
};
</script>
<style scoped lang="less">
.drawerContainer {
  padding: 0 10px;
  box-sizing: border-box;
  overflow: hidden;
  z-index: 100;
  position: fixed;
  top: 36px;
  bottom: 0;
  background: #fff;
  width: 30%;
  border-top: 1px solid #282f46;
  resize: horizontal;
  box-shadow: 0 8px 5px -5px rgba(0, 0, 0, 0.2),
    0 16px 10px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12);
  transition: right 0.4s ease;
  .drawer-title {
    pointer-events: none;
    text-align: left;
    position: absolute;
    font-size: 12px;
    font-weight: bolder;
    padding-left: 10px;
    left: 0;
    top: 0;
    right: 0;
    height: 26px;
    line-height: 26px;
    color: #eee;
    background: #051525;
  }
  .el-icon-close {
    color: #eee;
    cursor: pointer;
    position: absolute;
    right: 5px;
    top: 5px;
  }
  .moveContainer {
    padding: 26px 0 20px 0;
    height: 100%;
    box-sizing: border-box;
  }
}
</style>