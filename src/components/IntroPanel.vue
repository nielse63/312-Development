<template>
  <div class="canvas" data-in-view="false">
    <div class="scene scene--full" id="scene"></div>
    <h1>{{title}}</h1>
    <h2 v-if="subtitle">{{subtitle}}</h2>
  </div>
</template>

<script>
import canvas from '@/lib/canvas';

export default {
  name:  'IntroPanel',
  props: {
    title:    String,
    subtitle: String,
  },
  methods: {
    startCanvas(element) {
      canvas(element);
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.$el.setAttribute('data-in-view', 'true');
      const element = document.getElementById('scene');
      if (element) {
        setTimeout(() => {
          this.startCanvas(element);
        }, 0);
      }
    });
  },
};
</script>

<style scoped lang="scss">
@import "../assets/styles/lib/mixins";
@import "../assets/styles/lib/vars";

$h1-transform: 25px;
$h2-transform: ($h1-transform * 2);

.canvas {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  padding: 5vh 0;
  color: $color-white;
  text-align: center;
  perspective: 100vw;
  background-image: linear-gradient(to bottom, #00588f, #0c96c0);
  contain: content;
  min-height: 80vh;
  max-height: 600px;

  @media(min-width: $desktop-width), (orientation: landscape) {
    min-height: 100vh;
  }

  @media(min-height: 600px) {
    max-height: 600px;
  }
}

.scene {
  @include size(100%);
  position: absolute;
  top: 0;
  left: 0;
}

h1,
h2 {
  opacity: 0;
  transform: translate(0, $h1-transform);
  transition: 0.5s ease-in-out;
  transition-property: transform, opacity;
  will-change: transform, opacity;
}

h1 {
  margin: 0;
  font-family: $font-family-serif;
  font-size: 10vw;

  [data-in-view="false"] & {
    transform: translate(0, -($h2-transform));
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
  transform: translate(0, $h2-transform);

  @media (max-width: $mobile-width) {
    font-size: 18px;
    max-width: 80vw;
  }

  [data-in-view="false"] & {
    transform: translate(0, -($h1-transform));
  }

  &:before,
  &:after {
    content: "";
    position: absolute;
    top: 50%;
    height: 1px;
    background-color: $color-white;
    width: 20%;

    @media (max-width: $mobile-width) {
      width: 5%;
    }
  }

  &:before {
    right: 100%;
  }

  &:after {
    left: 100%;
  }
}

[data-in-view="true"] {
  h1,
  h2 {
    opacity: 1;
    transform: translate(0, 0);
  }
}
</style>
