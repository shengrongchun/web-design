<template>
  <div class="drag-container"
       @dragover.prevent
       @drop.prevent.stop="onDrop">
    <grid-layout v-if="list.length > 0"
                 :layout.sync="list"
                 :col-num="$store.state.colNum"
                 :row-height="$store.state.rowHeight"
                 :isResizable="!preview"
                 :isDraggable="!preview"
                 :responsive="false"
                 :margin="[0, 0]">
      <grid-item v-for="comp in list"
                 :x="comp.x"
                 :y="comp.y"
                 :w="comp.w"
                 :h="comp.h"
                 :i="comp.i"
                 :key="comp.i"
                 :class="{ active: comp.i === $store.state.activeComp.i && !preview }"
                 @click.native.stop="onChangeActiveComp(comp)">
        <component :is="comp.type"
                   :COMP="comp"
                   class="comp">
          nodata
          <!-- <dragContainer slot="$$container"
                         :list="comp.children" /> -->
        </component>
      </grid-item>
    </grid-layout>
    <NoData v-else />
  </div>
</template>
<script>
import VueGridLayout from "vue-grid-layout";
import NoData from "./noData";
export default {
  name: "dragContainer",
  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem,
    NoData,
  },
  props: {
    list: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  computed: {
    preview() {
      return this.$store.state.preview;
    },
  },
  methods: {
    onChangeActiveComp(comp) {
      //改变选中组件
      this.$store.commit("changeActiveComp", comp);
    },
    onDrop(ev) {
      // 拖组件
      const { type, title } = JSON.parse(ev.dataTransfer.getData("type")) || {};
      if (type) {
        this.$store.commit("addComp", {
          title,
          type,
          list: this.list,
        });
      }
    },
  },
};
</script>
<style scoped lang="less">
.drag-container {
  background: #eee;
  height: 100%;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  box-sizing: border-box;
  .vue-grid-layout {
    .vue-grid-item {
      box-sizing: border-box;
      background: #c0c4cc;
      cursor: default !important;
      &.active {
        border: 1px solid #61a9f8 !important;
      }
    }
  }
  .comp {
    //组件样式
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    // background: #fff;
    // &.active {
    //   border: 1px solid #61a9f8 !important;
    // }
  }
}
</style>
