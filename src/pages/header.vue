<template>
  <div class="header">
    <template>
      <div class="header-left">WebDesign</div>
      <div class="header-right">
        <div class="header-btn" @click="onShowDrawer('Views')">项目结构</div>
        <div class="header-btn" @click="onShowDrawer('Comps')">选取组件</div>
        <div class="header-btn" @click="onPreview">预览</div>
        <div class="header-btn" @click="onSave">保存</div>
      </div>
    </template>
    <!-- 页面结构 -->
    <DrawerContainer v-model="showViews" title="项目结构">
      <ViewsContainer />
    </DrawerContainer>
    <!-- 选取组件 -->
    <DrawerContainer v-model="showComps" title="选取组件">
      <CompsContainer />
    </DrawerContainer>
    <!-- 选中组件配置页面 -->
    <DrawerContainer v-model="showEdits" title="组件配置">
      <EditsContainer />
    </DrawerContainer>
  </div>
</template>
<script>
import DrawerContainer from "./lib/drawerContainer";
import CompsContainer from "./editor/compsContainer";
import ViewsContainer from "./editor/viewsContainer";
import EditsContainer from "./editor/editsContainer";
export default {
  data() {
    return {
      showComps: false,
      showViews: false,
      showEdits: false,
    };
  },
  components: {
    DrawerContainer,
    CompsContainer,
    ViewsContainer,
    EditsContainer,
  },
  watch: {
    "$store.state.activeComp": {
      //监听选中组件的变化
      handler(newVal) {
        const { type } = newVal;
        this.onShowDrawer(type === "to-router-view" ? "Views" : "Edits");
      },
    },
  },
  methods: {
    onShowDrawer(mask) {
      this.showEdits = this.showComps = this.showViews = false;
      this["show" + mask] = true;
    },
    onPreview() {
      this.$store.commit("modeChange", "preview");
    },
    onSave() {
      //保存配置信息
      this.$store.commit("saveCompList");
    },
  },
};
</script>
<style scoped lang="less">
.header {
  padding: 0 15px;
  background: #051525;
  height: 36px;
  line-height: 34px;
  display: flex;
  justify-content: space-between;
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
    //background: #282f46;
    line-height: 22px;
    height: 22px;
    & + {
      margin-left: 10px;
    }
  }
}
</style>