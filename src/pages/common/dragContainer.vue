<template>
  <div class="drag-container"
       @dragover.prevent
       @drop.prevent.stop="onDrop">
    <grid-layout v-if="list.length>0"
                 :layout.sync="list"
                 :col-num="$store.state.colNum"
                 :row-height="$store.state.rowHeight"
                 :isResizable="!preview"
                 :isDraggable="!preview"
                 :responsive="false"
                 :margin="[0, 0]">
      <grid-item v-for="(comp) in list"
                 :x="comp.x"
                 :y="comp.y"
                 :w="comp.w"
                 :h="comp.h"
                 :i="comp.i"
                 :key="comp.i">
        <component :is="comp.type"
                   :class="{'active':(comp.i===$store.state.activeComp.i&&!preview)}"
                   :COMP="comp"
                   @click.native.stop="$store.commit('changeActiveComp',comp)"
                   class="comp">
          <dragContainer slot="$$container"
                         :list="comp.children" />
        </component>
      </grid-item>
    </grid-layout>
    <div v-else>请添加组件开始创建项目吧！！！</div>
  </div>
</template>
<script>
import VueGridLayout from 'vue-grid-layout'
export default {
  name: 'dragContainer',
  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem
  },
  props: {
    list: {
      type: Array,
      default() {
        return []
      }
    }
  },
  computed: {
    preview() {
      return this.$store.state.preview
    }
  },
  methods: {
    onDrop(ev) { // 拖组件
      const { type, title } = JSON.parse(ev.dataTransfer.getData('type')) || {}
      if (type) {
        this.$store.commit('addComp', {
          title,
          type,
          list: this.list
        })
      }
      console.log(title, type)
    }
  },
};
</script>
<style scoped lang="less">
.drag-container {
  background: #ecf5ff;
  height: 100%;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  box-sizing: border-box;
  padding-bottom: 20px;
  .vue-grid-layout {
    .vue-grid-item {
      box-sizing: border-box;
      background: #eee;
      cursor: default !important;
    }
  }
  .comp {
    //组件样式
    height: 100%;
    width: 100%;
    background: #fff;
    &.active {
      border: 1px solid #61a9f8 !important;
    }
  }
}
</style>
