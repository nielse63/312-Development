<template>
  <div class="<%= component.lowercase %>">
  </div>
</template>

<script>
  export default {
    name: '<%= component.lowercase %>',
    mounted() {
      // ...
    },
  };
</script>

<style lang="scss" scoped>
  @import 'src/assets/styles/lib/vars';

  .<%= component.lowercase %> {
    // ...
  }
</style>
