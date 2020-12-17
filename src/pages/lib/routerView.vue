<template>
  <router-view v-bind="$attrs"
               v-on="$listeners"></router-view>
</template>
<script>
export default {
  name: "toRouterView",
};
</script>