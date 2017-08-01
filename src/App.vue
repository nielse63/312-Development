<template>
  <div id="app" v-bind:class="{ 'menu-open': isMenuOpen, app: true }" @click="onClick">
    <app-header />
    <main id="main" class="main">
      <router-view></router-view>
    </main>
    <app-footer />
    <navigation />
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import AppHeader from '@/components/Header';
  import AppFooter from '@/components/Footer';
  import Navigation from '@/components/Navigation';

  export default {
    name: 'app',
    components: {
      AppHeader,
      AppFooter,
      Navigation,
    },
    computed: {
      ...mapGetters({
        isMenuOpen: 'isMenuOpen',
      }),
    },
    methods: {
      onClick(e) {
        if (this.isMenuOpen && !e.target.closest('.navigation') && !e.target.closest('.header__button')) {
          this.$store.dispatch('toggleMenu');
        }
      },
    },
    // eslint-disable-next-line complexity
    mounted() {
      let latestKnownScrollY = 0;
      let ticking = false;
      const scroll = window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        function (callback) { window.setTimeout(callback, 1000 / 60); }; // eslint-disable-line func-names

      const update = () => {
        if (this.isMenuOpen) {
          this.$store.dispatch('toggleMenu');
        }
        ticking = false;
      };

      const loop = () => {
        const top = window.scrollY;
        if (!ticking && top !== latestKnownScrollY) {
          ticking = true;
          latestKnownScrollY = top;
          update();
        }
        scroll(loop);
      };
      loop();
    },
  };
</script>

<style lang="scss">
  @import "assets/styles/common/reset";
  @import "assets/styles/common/globals";
  @import "assets/styles/shared/grid";
  @import "assets/styles/shared/links";
  @import "assets/styles/shared/font-awesome";

  @font-face {
    font-family: 'FontAwesome';
    src: url('assets/fonts/fontawesome-webfont.woff2?v=4.7.0') format('woff2'),
         url('assets/fonts/fontawesome-webfont.woff?v=4.7.0') format('woff');
    font-weight: normal;
    font-style: normal;
  }
</style>

<style lang="scss" scoped>
  @import "assets/styles/main";

  .app {
    max-width: 100vw;
    overflow-x: hidden;
  }

  .main,
  .footer {
    position: relative;

    &:after {
      @include size(100%);

      content: '';
      opacity: 0;
      visibility: hidden;
      background-color: #111;
      transition: opacity $transition-duration,
                  visibility $transition-duration;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;

      .menu-open & {
        opacity: 0.5;
        visibility: visible;
      }
    }
  }
</style>
