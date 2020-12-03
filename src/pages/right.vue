<template>
  <div class="right">
    <div v-if="$store.state.activeComp.type==='to-router-view'">
      <el-tree class="filter-tree"
               :data="$store.state.compList"
               :props="defaultProps"
               default-expand-all
               ref="tree">
        <span class="custom-tree-node"
              slot-scope="{ data }">
          <span>{{ data.title }}</span>
          <span>
            <el-button type="text"
                       size="mini">
              Append
            </el-button>
            <el-button type="text"
                       size="mini">
              Delete
            </el-button>
          </span>
        </span>
      </el-tree>
    </div>
  </div>
</template>
<script>
const Foo = () => import('../components/header')
export default {
  data() {
    return {
      defaultProps: {
        children: 'children',
        label: 'title'
      }
    }
  },
  created() {
    console.log('this', this)
    //this.setAddRouter()
  },
  updated() {
    console.log('COMP', this.$store.state.activeComp)
  },
  methods: {
    setAddRouter() {//添加路由
      const { type } = this.$store.state.activeComp
      if (type === 'to-router-view') {
        this.$router.addRoutes([{
          path: '/',
          component: Foo
        }])
        console.log('mmmm', this.$router)
      }
    }
  }
}
</script>
<style scoped lang="less">
.right {
  flex: 3;
  background: #fff;
}
</style>