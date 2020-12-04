<template>
  <div
    class="drawerContainer"
    :style="{ right: showDrawer ? 0 : '-100%', width: width }"
  >
    <i @click="onClose" v-if="showDrawer" class="el-icon-close"></i>
    <slot />
  </div>
</template>
<script>
export default {
  props: {
    width: {
      type: String,
      default: "25%",
    },
  },
  data() {
    return {
      showDrawer: false,
    };
  },
  methods: {
    onClose() {
      this.showDrawer = false;
    },
  },
};
</script>
<style scoped lang="less">
.drawerContainer {
  z-index: 1000;
  position: fixed;
  top: 40px;
  bottom: 0;
  right: 0;
  background: #fff;
  box-shadow: 0 8px 10px -5px rgba(0, 0, 0, 0.2),
    0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12);
  transition: right 0.4s ease;
  .el-icon-close {
    cursor: pointer;
    position: absolute;
    right: 5px;
    top: 5px;
  }
}
</style>