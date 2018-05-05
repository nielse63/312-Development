<template>
  <h2 class="panel-title">{{title}}</h2>
</template>

<script>
  export default {
    name: 'panel-title',
    props: {
      title: String,
    },
  };
</script>

<style lang="scss" scoped>
  @import 'src/assets/styles/lib/vars';

  .panel-title {
    font-family: $font-family-serif;
    font-weight: 400;
    font-style: italic;
    // font-size: 2rem;
  }
</style>
