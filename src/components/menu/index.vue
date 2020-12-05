<template>
  <div class="menu-comp">
    <!-- <el-button @click="isCollapse=!isCollapse">展开</el-button> -->
    <el-menu class="el-menu-class"
             background-color="#17233d"
             text-color="#fff"
             :collapse="isCollapse"
             active-text-color="#3693ff">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>布局</span>
        </template>
        <el-menu-item index="1-1"
                      @click="onGo('index')">布局1</el-menu-item>
        <el-menu-item index="1-2"
                      @click="onGo('index2')">布局2</el-menu-item>
        <el-menu-item index="1-3"
                      @click="onGo('index3')">布局3</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>组件</span>
        </template>
        <el-menu-item index="2-1"
                      @click="onGo('index')">组件A</el-menu-item>
        <el-menu-item index="2-2"
                      @click="onGo('index2')">组件B</el-menu-item>
        <el-menu-item index="2-3"
                      @click="onGo('index3')">组件C</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
import {
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
} from 'element-ui'
import { compInfo, install } from './config'
export default {
  name: 'menuComp',
  $$compInfo: compInfo,
  components: {
    [Menu.name]: Menu,
    [Submenu.name]: Submenu,
    [MenuItem.name]: MenuItem,
    [MenuItemGroup.name]: MenuItemGroup,
  },
  data() {
    return {
      isCollapse: false
    }
  },
  created() {
    install(this)
  },
  methods: {
    onGo(path) {
      this.$router.push({ path })
    }
  }
}
</script>
<style scoped lang="less">
.menu-comp {
  overflow: hidden;
  .el-menu-class {
    height: 100%;
  }
}
</style>