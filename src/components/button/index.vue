<template>
  <div class="button-comp"
       ref="button">
    <el-button :type="type">{{label}}</el-button>
  </div>
</template>
<script>
import { compInfo, install } from "./config";
import { Button } from 'element-ui'
export default {
  name: "buttonComp",
  $$compInfo: compInfo,
  beforeCreate() {
    install(this);
  },
  components: {
    [Button.name]: Button
  },
  data() {
    return {
      label: '按钮名称',
      type: 'primary'
    }
  },
  mounted() {
    this.$refs.button.addEventListener('click', () => {
      console.log('kkkkk')
    })
  }
};
</script>
<style scoped lang="less">
.button-comp {
}
</style>