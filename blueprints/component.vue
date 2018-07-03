<template>
  <div class="<%= data.kebab %>">
    <!-- ... -->
  </div>
</template>

<script>
export default {
  name: '<%= data.pascal %>',
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/lib/vars";

.<%= data.kebab %> {
  // ...
}
</style>
