<template>
  <div class="addComp">
    <div class="addComp-title">
      <div class="addComp-title-name">{{data.title}}</div>
      <span class="addComp-btn"
            @click="onAdd">添加</span>
    </div>
    <div class="addComp-Container"
         v-for="(val,index) in VM[data.key] || []"
         :key="index+'container'">
      <template v-for="(item,idx) in data.template || []">
        <template v-if="item.status!=='hidden'">
          <div :key="idx"
               class="addComp-Container-name">{{item.name}}</div>
          <el-input :key="idx+'item'"
                    v-model="val[item.key]"
                    :placeholder="'请输入'+item.name" />
        </template>
      </template>
      <span class="addComp-btn"
            @click="onDelete(index)">删除</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Object,
      default() {
        return {}
      }
    },
    VM: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  created() {
    this.setTabKeys()
  },
  methods: {
    setTabKeys() {//设置add模板
      const list = this.data.template || []
      this.addVal = {}
      list.forEach(({ key, default: defaultVal }) => {
        this.addVal[key] = defaultVal
      })
    },
    onAdd() {//新增add模板数据
      if (this.VM[this.data.key] instanceof Array) {
        const obj = JSON.parse(JSON.stringify(this.addVal))
        this.VM[this.data.key].push(obj)
      }
    },
    onDelete(idx) {//删除某个add模板数据
      (this.VM[this.data.key] || []).splice(idx, 1)
    }
  }
}
</script>
<style scoped lang="less">
.addComp {
  .addComp-title {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #eee;
  }
  .addComp-btn {
    color: #66b1ff;
    cursor: pointer;
    font-size: 13px;
  }
  .addComp-Container {
    margin-top: 5px;
    display: flex;
    .addComp-Container-name {
      font-size: 14px;
      color: #5c5353;
    }
    .el-input {
      margin: 0 5px;
      flex: 1;
    }
  }
}
</style>