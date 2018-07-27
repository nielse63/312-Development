<template>
  <div class="canvas" data-inview="true">
    <canvas class="scene scene--full" id="scene" width="100%" height="100%"></canvas>
    <h1>{{title}}</h1>
    <h2 v-if="subtitle">{{subtitle}}</h2>
  </div>
</template>

<script>
import particleNetwork from '@/lib/particle-network';

export default {
  name:  'IntroPanel',
  props: {
    title:    String,
    subtitle: String,
  },
  data() {
    return {
      canvas:  null,
      visible: true,
    };
  },
  methods: {
    hideTitle() {
      this.visible = false;
      this.$el.dataset.inview = 'false';
    },
    showTitle() {
      this.visible = true;
      this.$el.dataset.inview = 'true';
    },
    handleTitle({ isIntersecting, intersectionRatio }) {
      if (!isIntersecting) {
        this.hideTitle();
      } else if (intersectionRatio > 0.6 && !this.visible) {
        this.showTitle();
      }
    },
    setObserver() {
      const options = {
        root:       null,
        rootMargin: '0px',
        threshold:  [],
      };
      for (let i = 0; i <= 1; i += 0.02) {
        options.threshold.push(i);
      }
      const observer = new IntersectionObserver((entries) => {
        this.handleTitle(entries[0]);
      }, options);
      observer.observe(this.$el);
    },
  },
  mounted() {
    this.canvas = this.$el.querySelector('canvas');
    this.setObserver();

    this.$nextTick(() => {
      const fn = particleNetwork(this.canvas);
      fn.start();
    });
  },
};
</script>

<style scoped lang="scss">
@import "../assets/styles/lib/mixins";
@import "../assets/styles/lib/vars";

.canvas {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  position: relative;
  color: $color-white;
  text-align: center;
  perspective: 100vw;
  background-image: linear-gradient(to bottom, #00588f, #0c96c0);
  contain: content;
}

canvas {
  @include size(100%);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;

  ~ * {
    z-index: 1;
  }
}

h1,
h2 {
  will-change: transform, opacity;
  transition: 0.5s ease-in-out;
  transition-property: transform, opacity;
}

h1 {
  margin: 0;
  font-family: $font-family-serif;
  font-size: 10vw;

  [data-inview="false"] & {
    opacity: 0;
    transform: translate(0, -50px);
  }
}

h2 {
  font-size: 1.25em;
  padding: 0 0.75em;
  margin: 0;
  letter-spacing: 0.5em;
  text-indent: 0.5em;
  font-weight: bold;
  text-transform: uppercase;
  position: relative;
  max-width: 50vw;
  transition-delay: 0.05s;

  [data-inview="false"] & {
    opacity: 0;
    transform: translate(0, -25px);
  }

  &:before,
  &:after {
    content: "";
    position: absolute;
    top: 50%;
    height: 1px;
    background-color: $color-white;
    width: 20%;
  }

  &:before {
    right: 100%;
  }

  &:after {
    left: 100%;
  }
}
</style>
