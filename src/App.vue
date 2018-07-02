<template>
  <div id="main" class="app" :class="appClass">
    <div class="page" @click="onpageclick">
      <transition>
        <router-view :class="{ open: isNavOpen, 'page-content': true }"></router-view>
      </transition>
    </div>
    <app-navigation :open="isNavOpen"></app-navigation>
    <button class="app-navigation-button" :class="buttonClass" @click="onbuttonclick">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </button>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import AppNavigation from '@/components/AppNavigation';

export default {
  name:       'app',
  components: {
    AppNavigation,
  },
  data() {
    return {
      isNavOpen:     false,
      isBelowCanvas: false,
      navClass:      'app-navigation',
    };
  },
  watch: {
    $route() {
      this.isNavOpen = false;
    },
  },
  computed: {
    isButtonDark() {
      return this.isNavOpen || this.isBelowCanvas;
    },
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
    buttonClass() {
      return {
        'button-open': this.isNavOpen,
        'button-dark': this.isButtonDark,
      };
    },
  },
  methods: {
    ...mapMutations('canvas', {
      pauseCanvas:  'pause',
      resumeCanvas: 'start',
    }),
    onbuttonclick() {
      this.isNavOpen = !this.isNavOpen;
    },
    onpageclick() {
      if (this.isNavOpen) {
        this.isNavOpen = false;
      }
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

$button-width: 40px;
$button-height: 34px;

$bar-height: 6px;
$top-bar-top: 0;
$bottom-bar-top: ($button-height - $bar-height);
$middle-bar-top: ($bottom-bar-top / 2);

.app {
  background-color: $color-black;
}

.app-navigation-button {
  cursor: pointer;
  background: none;
  border: 0;
  position: fixed;
  top: 1rem;
  right: 1rem;
  width: $button-width;
  height: $button-height;
  z-index: 2;

  span {
    display: block;
    position: absolute;
    height: $bar-height;
    width: 100%;
    background: $color-white;
    border-radius: 9px;
    opacity: 1;
    left: 0;
    transform: rotate(0deg);
    transition: 0.25s ease-in-out;
    transition-property: top, width, left, transform;

    &:nth-child(1) {
      top: $top-bar-top;
    }

    &:nth-child(2),
    &:nth-child(3) {
      top: $middle-bar-top;
    }

    &:nth-child(4) {
      top: $bottom-bar-top;
    }
  }
}

.button-dark {
  span { /* stylelint-disable-line no-descending-specificity */
    background: $color-black;
  }
}

.button-open {
  span { /* stylelint-disable-line no-descending-specificity */
    &:nth-child(1),
    &:nth-child(4) {
      top: $middle-bar-top;
      width: 0%;
      left: 50%;
    }

    &:nth-child(2) {
      transform: rotate(45deg);
    }

    &:nth-child(3) {
      transform: rotate(-45deg);
    }
  }
}

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
