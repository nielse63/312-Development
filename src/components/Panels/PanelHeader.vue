<template>
  <header class="panel__header">
    <h2 class="panel__title">{{this.title}}</h2>
  </header>
</template>

<script>
  export default {
    name: 'panel-header',
    props: {
      title: {
        type: String,
        require: true,
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/main";

  .panel {
    &__header {
      margin-bottom: 2rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    &__title {
      display: inline-block;
      border-bottom: 1px solid $border-color;
      padding: 0 0.25em;
    }
  }
</style>
