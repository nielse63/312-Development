<template>
  <div class="content-panel" :class="wrapperClass">
    <header v-if="title">
      <h2>{{title}}</h2>
    </header>
    <div class="body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name:  'ContentPanel',
  props: {
    title: {
      type: String,
    },
  },
  data() {
    return {
      inView:    false,
      offsetTop: 0,
    };
  },
  computed: {
    wrapperClass() {
      return {
        'in-view': this.inView,
      };
    },
  },
  methods: {
    onscroll() {
      if (this.inView) {
        window.removeEventListener('scroll', this.onscroll);
        return;
      }
      const windowBottom = window.scrollY + window.innerHeight;
      if (windowBottom > this.offsetTop) {
        this.inView = true;
      }
    },
    setOffsetTop() {
      const { offsetTop, clientHeight } = this.$el;
      this.offsetTop = offsetTop + (clientHeight / 2);
    },
  },
  beforeMount() {
    window.addEventListener('scroll', this.onscroll, false);
  },
  mounted() {
    this.setOffsetTop();
    this.onscroll();
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.onscroll);
  },
};
</script>

<style scoped lang="scss">
@import "../assets/styles/lib/vars";

.content-panel {
  padding: $content-padding ($content-padding * 2);
  font-size: 18px;
  margin: 0 auto;

  &:nth-child(even) {
    text-align: right;
  }

  & + & {
    border-top: 1px solid $border-color;
  }
}

header {
  font-size: 1.25em;
  margin-top: 2rem;
}

.body {
  line-height: 2;
}

h2 {
  padding: 0 0.35em;
  transition: color 1s;
  transition-timing-function: cubic-bezier(0.2, 1, 0.3, 1);
  position: relative;
  display: inline-block;

  &:before {
    content: "";
    background: fade-out($color-pink, 0.15);
    position: absolute;
    bottom: 0;
    left: 0;
    width: 95%;
    height: 50%;
    opacity: 0.3;
    transform: scale3d(0, 1, 1);
    transform-origin: 0% 50%;
    transition: transform 1s;
    transition-timing-function: cubic-bezier(0.2, 1, 0.3, 1);
  }
}

.in-view {
  h2 {
    color: $color-pink;

    &:before {
      transform: scale3d(1, 1, 1);
      background: $color-pink;
    }
  }
}

a {
  background-color: fade-out($color-pink, 0.35);
  color: $color-white;
  padding: 0 0.25em;
  font-weight: 700;

  &:hover {
    background-color: fade-out($color-pink, 0.28);
  }
}
</style>
