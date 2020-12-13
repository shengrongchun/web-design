<template>
  <div class="container">
    <Header v-if="$store.state.mode === 'edit'" />
    <div class="layout">
      <Main :list="$store.state.compList" />
    </div>
    <div class="goback" v-if="$store.state.mode === 'preview'">
      <el-button type="primary" plain @click="onGoEdit">返回</el-button>
    </div>
  </div>
</template>

<script>
import Header from "./pages/header";
import Main from "./pages/main";
export default {
  name: "App",
  components: {
    Header,
    Main,
  },
  created() {
    const { id } = this.$route.query;
    if (id !== undefined) {
      this.$store.commit("onLineChange", this); //浏览模式
    }
  },
  methods: {
    onGoEdit() {
      this.$store.commit("modeChange", "edit");
    },
  },
};
</script>

<style>
html,
body {
  margin: 0;
  height: 100%;
  overflow: hidden;
}
</style>
<style lang="less" scoped>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .layout {
    flex: 1;
    overflow: hidden;
  }
  .goback {
    position: fixed;
    right: 10px;
    bottom: 15px;
    z-index: 10000;
  }
}
</style>
