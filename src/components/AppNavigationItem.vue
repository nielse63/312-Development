<template>
  <li>
    <a
      :href="path"
      :class="color"
      @click="onclick"
    >{{text}}</a>
  </li>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name:  'AppNavigationItem',
  props: {
    path: {
      type:     String,
      required: true,
    },
    text: {
      type:     String,
      required: true,
    },
    color: {
      type:    String,
      default: 'black',
    },
  },
  methods: {
    ...mapActions('nav', {
      closeNav: 'close',
    }),
    scrollTo(top, e) {
      e.preventDefault();
      this.closeNav();
      this.$nextTick(() => {
        window.scrollTo({ top, behavior: 'smooth' });
      });
    },
    onclick(e) {
      const href = e.srcElement.href.split('/').pop();
      if (!href) {
        this.scrollTo(0, e);
        return;
      }
      const target = document.querySelector(href);
      if (!target) {
        return;
      }
      const top = target.offsetTop;
      this.scrollTo(top, e);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/lib/vars";
@import "../assets/styles/lib/mixins";

li {
  margin: 2rem 0;
}

a {
  padding: 0 0.35em;
  transition: color 0.5s;
  transition-timing-function: cubic-bezier(0.2, 1, 0.3, 1);
  position: relative;
  display: inline-block;

  &:before {
    content: "";
    background: fade-out($color-black, 0.15);
    position: absolute;
    z-index: -1;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50%;
    opacity: 0.5;
    transform: scale3d(0, 1, 1);
    transform-origin: 0% 50%;
    transition: transform 0.5s;
    transition-timing-function: cubic-bezier(0.2, 1, 0.3, 1);
  }

  &:hover {
    color: $color-black;

    &:before {
      transform: scale3d(1, 1, 1);
    }
  }
}

.router-link-exact-active {
  color: $color-black;

  &:before {
    transform: scale3d(1, 1, 1);
  }
}

.pink {
  @include nav-link($color-pink-dark);
}

.purple {
  @include nav-link($color-purple-light);
}

.green {
  @include nav-link($color-green-dark);
}

.blue {
  @include nav-link($color-blue-dark);
}

.orange {
  @include nav-link($color-orange-dark);
}
</style>
