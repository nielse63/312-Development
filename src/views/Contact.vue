<template>
  <div class="contact">
    <div class="canvas">
      <canvas class="scene scene--full" id="contact-scene" width="100%" height="100%"></canvas>
      <h1>{{title}}</h1>
    </div>
  </div>
</template>

<script>
import canvas from '@/lib/canvas/cubes';

export default {
  name: 'Contact',
  data() {
    return {
      title: 'Contact Me',
    };
  },
  mounted() {
    const element = document.getElementById('contact-scene');
    canvas(element);
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/lib/vars";
@import "../assets/styles/canvas";
</style>
