<template>
  <section class="banner">
    <div id="bubbles"></div>
    <header class="title container">
      <h1 class="page-title">{{title}}</h1>
      <h2 v-if="subtitle" class="page-subtitle">{{subtitle}}</h2>
    </header>
  </section>
</template>

<script>
  import bubbles from '@/lib/bubbles';

  export default {
    name: 'banner',
    props: {
      title: {
        type: String,
        require: true,
      },
      subtitle: {
        type: String,
      },
    },
    mounted() {
      bubbles();
    },
  };
</script>

<style lang="scss" scoped>
  @import "../assets/styles/components/banner";

  .title {
    @media (max-width: $tablet-width) {
      padding-left: 1rem;
      padding-right: 1rem;
    }
  }
</style>
