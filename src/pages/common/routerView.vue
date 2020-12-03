<template>
  <router-view></router-view>
</template>
<script>
const Foo = () => import('../../components/menu')
export default {
  name: 'toRouterView',
  props: {
    COMP: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  created() {
    console.log('royter-view', this.COMP)
    //this.setAddRouter()
  },
  methods: {
    setAddRouter() {//添加路由
      this.$router.addRoutes([{
        path: '/',
        component: Foo
      }])
    }
  }
}
</script>