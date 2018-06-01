<template>
  <header class="site-title">
    <div class="titles">
      <h1>{{title}}</h1>
      <h2>{{subtitle}}</h2>
    </div>
    <div class="button-group">
      <scroll-to selector="#about-me" class="button__ghost--white">Keep Reading</scroll-to>
    </div>
  </header>
</template>

<script>
  import ScrollTo from '@/components/ScrollTo';

  export default {
    name:       'site-title',
    components: {
      ScrollTo,
    },
    props: {
      title:    String,
      subtitle: String,
    },
  };
</script>

<style lang="scss" scoped>
  @import 'src/assets/styles/lib/vars';

  .site-title {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  }

  h1 {
    font-size: 6rem;
    margin: 0;
    color: $color-black;
  }

  h2 {
    text-transform: uppercase;
    font-size: 1.5rem;
    margin-top: 1.5em;
  }
</style>
