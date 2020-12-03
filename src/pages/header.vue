<template>
  <div :class="{'header':true,'hidden':!show}">
    <template v-if="show">
      <div class="header-left">
        web-design
      </div>
      <div class="header-right">
        <div class="header-btn"
             @click="$refs.views.showDrawer=true">项目结构</div>
        <div class="header-btn"
             @click="$refs.comps.showDrawer=true">选取组件</div>
        <div class="header-btn"
             @click="onPreview(true)">预览</div>
      </div>
    </template>
    <div class="goback"
         v-if="!show">
      <el-button type="primary"
                 plain
                 @click="onPreview(false)">返回</el-button>
    </div>
    <DrawerContainer ref="comps">
      <Comps />
    </DrawerContainer>
    <DrawerContainer ref="views">
      <Views />
    </DrawerContainer>
  </div>
</template>
<script>
import DrawerContainer from './common/drawerContainer'
import Comps from './dialogs/comps'
import Views from './dialogs/views'
export default {
  computed: {
    show() {
      return !this.$store.state.preview
    }
  },
  components: {
    DrawerContainer,
    Comps,
    Views
  },
  methods: {
    onPreview(val) {
      this.$store.commit('previewChange', val)
    }
  }
}
</script>
<style scoped lang="less">
.header {
  padding: 0 15px;
  background: #313f69;
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
    border-radius: 5px;
    font-weight: bolder;
    color: #eee;
    background: #282f46;
    line-height: 22px;
    height: 22px;
    & + {
      margin-left: 10px;
    }
  }
  .goback {
    position: fixed;
    right: 10px;
    top: 5px;
    z-index: 1;
  }
}
</style>