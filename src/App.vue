<template>
  <div class="container">
    <Header />
    <div class="layout">
      <Main />
      <Right v-if="showRight" />
    </div>
  </div>
</template>

<script>
import Header from './pages/header'
import Main from './pages/main'
import Right from './pages/right'
export default {
  name: "App",
  components: {
    Header,
    Right,
    Main
  },
  computed: {
    showRight() {
      const { preview, activeComp } = this.$store.state
      return !preview && activeComp && activeComp.type
    }
  }
};
</script>

<style>
html,
body {
  margin: 0;
  height: 100%;
}
</style>
<style lang="less" scoped>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  .layout {
    flex: 1;
    display: flex;
  }
}
</style>
