<template>
  <div class="editorClass">
    <template v-for="(item,idx) in list">
      <component :is="item.type+'Comp'"
                 v-if="item.type"
                 :data="item"
                 :VM="VM"
                 :key="idx"></component>
    </template>
  </div>
</template>
<script>
import AddComp from './editorComps/addComp'
import InputComp from './editorComps/inputComp'
export default {
  props: {
    list: {
      type: Array,
      default() {
        return []
      }
    },
    VM: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  components: {
    AddComp,
    InputComp
  },
}
</script>
<style scoped>
.editorClass {
  height: 100%;
}
</style>