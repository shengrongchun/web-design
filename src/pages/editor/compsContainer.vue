<template>
  <div class="comp-container">
    <div class="search">
      <el-input v-model="compName" placeholder="请搜索组件"></el-input>
    </div>
    <div class="comps">
      <el-card
        :body-style="{ padding: '0px' }"
        v-for="(comp, idx) in listCom"
        :key="idx"
        :header="comp.title"
      >
        <img
          :src="comp.img"
          v-if="comp.img"
          draggable="true"
          @dragstart.stop="
            (e) => {
              onDragstart(e, comp);
            }
          "
          class="image"
        />
        <div
          v-else
          draggable="true"
          @dragstart.stop="
            (e) => {
              onDragstart(e, comp);
            }
          "
          class="router"
        >
          路由层
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      compName: "",
      showDrawer: false,
      compsList: [
        {
          title: "路由容器",
          name: "to-router-view",
        },
      ],
    };
  },
  created() {
    this.init();
  },
  computed: {
    listCom() {
      return this.compsList.filter(({ title }) => {
        return title.indexOf(this.compName) > -1;
      });
    },
  },
  methods: {
    init() {
      const obj = this.$options.components;
      for (let key in obj) {
        const { $$compInfo, name } = obj[key].extendOptions || {};
        if ($$compInfo) {
          this.compsList.push(Object.assign({ name }, $$compInfo));
        }
      }
    },
    onDragstart(ev, { name, title }) {
      // 传组件类型
      ev.dataTransfer.setData("type", JSON.stringify({ type: name, title }));
    },
  },
};
</script>
<style scoped lang="less">
.comp-container {
  padding: 15px 10px;
  height: 100%;
  .comps {
    padding: 30px 0;
    overflow: auto;
    height: 100%;
    .el-card {
      margin-bottom: 15px;
      overflow: auto;
      .image {
        min-height: 100px;
      }
      .router {
        line-height: 100px;
        background: #eee;
        text-align: center;
      }
    }
  }
}
</style>