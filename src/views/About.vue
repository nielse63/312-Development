<template>
  <div class="about">
    <div class="canvas">
      <canvas class="scene scene--full" id="about-scene" width="100%" height="100%"></canvas>
      <h1>{{title}}</h1>
    </div>
  </div>
</template>

<script>
import canvas from '@/lib/canvas/sphere';

export default {
  name: 'About',
  data() {
    return {
      title: 'About Me',
    };
  },
  mounted() {
    const element = document.getElementById('about-scene');
    canvas(element);
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/lib/vars";
@import "../assets/styles/canvas";
</style>
