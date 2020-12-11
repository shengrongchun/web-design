<template>
  <div :class="{ header: true, hidden: !show }">
    <template v-if="show">
      <div class="header-left">WebDesign</div>
      <div class="header-right">
        <div class="header-btn"
             @click="showDrawer = true">
          选取组件
        </div>
        <div class="header-btn"
             @click="onPreview(true)">预览</div>
        <div class="header-btn"
             @click="onSave()">保存</div>
      </div>
    </template>
    <div class="goback"
         v-if="!$store.state.onLine">
      <el-button type="primary"
                 plain
                 @click="onPreview(false)">返回</el-button>
    </div>
    <DrawerContainer ref="comps"
                     v-model="showDrawer">
      <CompsContainer />
    </DrawerContainer>
  </div>
</template>
<script>
import DrawerContainer from "./editor/drawerContainer";
import CompsContainer from "./editor/compsContainer";
export default {
  computed: {
    show() {
      return !this.$store.state.preview;
    },
  },
  data() {
    return {
      showDrawer: false
    }
  },
  components: {
    DrawerContainer,
    CompsContainer,
  },
  methods: {
    onPreview(val) {
      this.$store.commit("previewChange", val);
    },
    onSave() {//保存配置信息
      this.$store.commit("saveCompList");
    }
  },
};
</script>
<style scoped lang="less">
.header {
  padding: 0 15px;
  background: #282f46;
  height: 40px;
  line-height: 38px;
  display: flex;
  justify-content: space-between;
  &.hidden {
    height: 0;
  }
  .header-left,
  .header-right {
    color: #fff;
  }
  .header-btn {
    cursor: pointer;
    padding: 0 10px;
    font-size: 12px;
    display: inline-block;
    border-radius: 4px;
    font-weight: bolder;
    color: #eee;
    background: #191f31;
    line-height: 22px;
    height: 22px;
    & + {
      margin-left: 10px;
    }
  }
  .goback {
    position: fixed;
    right: 10px;
    bottom: 15px;
    z-index: 1;
  }
}
</style>