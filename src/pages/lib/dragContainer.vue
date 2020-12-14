<template>
  <div @dragover.prevent
       @drop.prevent.stop="onDrop"
       ref="drag-container"
       :class="{ 'drag-container': true, even }">
    <grid-layout v-if="list.length > 0"
                 :layout.sync="list"
                 :col-num="$store.state.colNum"
                 :row-height="rowHeight"
                 :isResizable="edit"
                 :isDraggable="edit"
                 :verticalCompact="false"
                 :useStyleCursor="false"
                 :margin="[0, 0]"
                 @layout-updated="onLayoutUpdatedEvent">
      <grid-item v-for="comp in list"
                 :x="comp.x"
                 :y="comp.y"
                 :w="comp.w"
                 :h="comp.h"
                 :i="comp.i"
                 :key="comp.i"
                 :class="{active: comp.i === $store.state.activeComp.i && edit}"
                 @moved="onChangeActiveComp()"
                 @click.native.stop="onChangeActiveComp(comp)">
        <component :is="comp.type"
                   :SHENGRONGCHUN="comp.i"
                   class="comp"
                   :even="!even">
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
import ToRouterView from "./routerView";
export default {
  name: "dragContainer",
  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem,
    NoData,
    ToRouterView, //有用
  },
  props: {
    list: {
      type: Array,
      default() {
        return [];
      },
    },
    even: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      rowHeight: 10,
    };
  },
  computed: {
    edit() {
      return this.$store.state.mode === "edit";
    },
  },
  methods: {
    onLayoutUpdatedEvent() {
      //每次重新计算行高以适应不同屏幕高度
      this.rowHeight =
        this.$refs["drag-container"].offsetHeight / this.$store.state.rowNum;
    },
    onChangeActiveComp(comp) {
      //改变选中组件
      if (!comp) {
        //说明是拖动事件
        this.noChangeActiveComp = true;
      } else {
        //点击事件
        if (!this.noChangeActiveComp) {
          //非拖动后的点击事件
          this.$store.commit("changeActiveComp", comp);
        }
        this.noChangeActiveComp = false;
      }
    },
    onDrop(ev) {
      const dataObj = ev.dataTransfer.getData("type");
      if (dataObj === "") {
        return;
      }
      // 拖组件
      const { type, title, offsetX, offsetY } = JSON.parse(dataObj) || {};
      const Y = Math.max(ev.offsetY - offsetY, 0);
      const X = Math.max(ev.offsetX - offsetX, 0);
      const Width =
        this.$refs["drag-container"].offsetWidth / this.$store.state.colNum;
      const Height =
        this.$refs["drag-container"].offsetHeight / this.$store.state.rowNum;
      //
      if (type) {
        this.$store.commit("addComp", {
          x: Math.floor(X / Width),
          y: Math.floor(Y / Height),
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
  height: 100%;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  background: #f5f7fa;
  &.even {
    background: #efeded;
  }
  .vue-grid-layout {
    .vue-grid-item {
      //box-sizing: border-box;
      touch-action: none;
      background: #ecf5ff;
      cursor: default !important;
      &.active {
        box-shadow: 0px 0px 3px 1px #000;
      }
      .comp {
        //组件样式
        height: 100%;
        width: 100%;
        overflow: auto;
        box-sizing: border-box;
      }
    }
  }
}
</style>
