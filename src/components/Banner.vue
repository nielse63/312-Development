<template>
  <section class="banner">
    <div id="bubbles"></div>
    <div class="title container">
      <h1 class="page-title">{{title}}</h1>
      <h2 v-if="subtitle" class="page-subtitle">{{subtitle}}</h2>
    </div>
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
</style>
