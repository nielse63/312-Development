<template>
  <section class="header" role="banner">
    <button class="header__button" @click="toggleMenu">Menu <i class="fa fa-bars" aria-hidden="true"></i></button>
  </section>
</template>

<script>
  import { mapActions } from 'vuex';

  export default {
    name: 'app-header',
    methods: {
      ...mapActions([
        'toggleMenu',
      ]),
    },
  };
</script>

<style lang="scss" scoped>
  @import '../assets/styles/main';

  .header {
    display: flex;
    justify-content: space-between;
    position: fixed;
    top: 0;
    right: 0;
    padding: 1em;
    z-index: 1;
    color: $color-white;

    &__pink {
      color: $color-pink;
    }

    &__button {
      padding: 1em 1.5em;
      text-transform: uppercase;
      font-weight: 700;
      font-size: 12px;
      letter-spacing: 0.25em;
      background-color: $color-white;
      border-radius: 2em;
      border: 1px solid $banner-color;
      color: $text-color;
    }
  }
</style>
