<template>
  <section class="banner">
    <div id="bubbles"></div>
    <header class="title container">
      <h1 class="site-title">Erik Nielsen</h1>
      <h2 class="site-title__sub">UI/UX Software Engineer</h2>
      <h3 class="site-title__sub__sub">At Enova International</h3>
    </header>
  </section>
</template>

<script>
  import bubbles from '@/lib/bubbles';

  export default {
    name: 'banner',
    mounted() {
      bubbles();
    },
  };
</script>

<style lang="scss" scoped>
  @import '../../assets/styles/components/banner';

  .site-title {
    font-size: 62px;
    letter-spacing: (16 / 118) + em;

    @media (min-width: $tablet-width) {
      font-size: 96px;
    }

    @media (min-width: $desktop-width) {
      font-size: 118px;
    }

    &__sub {
      font-size: 28px;
      letter-spacing: 10px;

      &__sub {
        font-size: 14px;
        letter-spacing: 6px;
      }
    }
  }
</style>
