<template>
  <div id="main" class="app" :class="appClass">
    <div class="page" @click="onpageclick">
      <transition>
        <router-view :class="routerViewClass"></router-view>
      </transition>
    </div>
    <app-navigation :open="isNavOpen"></app-navigation>
    <app-navigation-button></app-navigation-button>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import AppNavigation from '@/components/AppNavigation';
import AppNavigationButton from '@/components/AppNavigationButton';

export default {
  name:       'app',
  components: {
    AppNavigation,
    AppNavigationButton,
  },
  data() {
    return {
      isBelowCanvas: false,
    };
  },
  watch: {
    $route() {
      this.isNavOpen = false;
    },
  },
  computed: {
    ...mapState('nav', {
      isNavOpen: 'open',
    }),
    appClass() {
      const object = {
        'nav-open': this.isNavOpen,
      };
      const routeClassName = `view-${this.$route.name}`;
      object[routeClassName] = true;
      return object;
    },
    routerViewClass() {
      return {
        'page-content': true,
        open:           this.isNavOpen,
      };
    },
  },
  methods: {
    ...mapMutations('canvas', {
      pauseCanvas:  'pause',
      resumeCanvas: 'start',
    }),
    ...mapActions('nav', {
      closeNav: 'close',
    }),
    onpageclick() {
      this.closeNav();
    },
    onscroll() {
      const headerBottom = document.querySelector('.canvas').offsetHeight;
      if (!this.isBelowCanvas && window.scrollY > headerBottom) {
        this.isBelowCanvas = true;
        this.pauseCanvas();
      } else if (this.isBelowCanvas && window.scrollY <= headerBottom) {
        this.isBelowCanvas = false;
        this.resumeCanvas();
      }
    },
  },
  beforeMount() {
    window.addEventListener('scroll', this.onscroll, false);
  },
  mounted() {
    this.onscroll();
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.onscroll);
  },
};
</script>

<style lang="scss">
@import "assets/styles/global";
</style>

<style lang="scss" scoped>
@import "assets/styles/lib/vars";

.page {
  &-content {
    min-height: 100vh;
    transition: 0.25s opacity ease-in-out;
    will-change: opacity;

    &.open {
      opacity: 0.35;
    }
  }
}
</style>
