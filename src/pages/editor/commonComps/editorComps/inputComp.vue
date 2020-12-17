<template>
  <div>
    {{data.title}}
    <el-input v-model="value"
              @input="onChange" />
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
  data() {
    return {
      value: this.VM[this.data.key]
    }
  },
  methods: {
    onChange(val) {
      this.VM[this.data.key] = val
    }
  }
}
</script>