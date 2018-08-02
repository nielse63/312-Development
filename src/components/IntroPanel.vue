<template>
  <div class="canvas" v-in-view>
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
  mounted() {
    const canvas = this.$el.querySelector('canvas');
    const fn = particleNetwork(canvas);

    this.$nextTick(() => {
      fn.start();
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
  // position: relative;
  color: $color-white;
  text-align: center;
  perspective: 100vw;
  background-image: linear-gradient(to bottom, #00588f, #0c96c0);
  contain: content;
  min-height: 80vh;

  @media(min-width: $desktop-width), (orientation: landscape) {
    min-height: 100vh;
  }
}

canvas {
  @include size(100%);
  position: absolute;
  top: 0;
  left: 0;
  // z-index: 0;

  // ~ * {
  //   z-index: 1;
  // }
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
