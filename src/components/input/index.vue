<template>
  <div class="input-comp">
    <div class="input-comp-label">{{label}}</div>
    <el-input v-model="value"
              :placeholder="placeholder" />
  </div>
</template>
<script>
import { compInfo, install } from "./config";
import { Input } from 'element-ui'
export default {
  name: "inputComp",
  $$compInfo: compInfo,
  beforeCreate() {
    install(this);
  },
  components: {
    [Input.name]: Input
  },
  data() {
    return {
      outKey: 'value',
      placeholder: '请输入',
      label: '名称',
      value: null
    }
  }
};
</script>
<style scoped lang="less">
.input-comp {
  display: flex;
  vertical-align: middle;
  align-content: center;
  .input-comp-label {
    margin-right: 5px;
    line-height: 1.5;
  }
  .el-input {
    flex: 1;
  }
}
</style>