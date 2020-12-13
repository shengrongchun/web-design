<template>
  <div class="compscontainer">
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
        <div
          draggable="true"
          @mousedown.stop
          @dragstart.stop="
            (e) => {
              onDragstart(e, comp);
            }
          "
          class="router"
        >
          {{ comp.title }}
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
      //搜索过滤
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
      ev.dataTransfer.setData(
        "type",
        JSON.stringify({
          type: name,
          title,
          offsetX: ev.offsetX,
          offsetY: ev.offsetY,
        })
      );
    },
  },
};
</script>
<style scoped lang="less">
.compscontainer {
  height: 100%;
  .comps {
    box-sizing: border-box;
    padding: 30px 0;
    overflow: auto;
    height: 100%;
    .el-card {
      margin-bottom: 15px;
      .router {
        line-height: 100px;
        background: #eee;
        text-align: center;
      }
    }
  }
}
</style>