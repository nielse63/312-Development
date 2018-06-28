<template>
  <div class="experience">
    <div class="canvas">
      <canvas class="scene scene--full" id="experience-scene" width="100%" height="100%"></canvas>
      <h1>{{title}}</h1>
    </div>
  </div>
</template>

<script>
import canvas from '@/lib/canvas/brain';

export default {
  name: 'Experience',
  data() {
    return {
      title: 'My Experience',
    };
  },
  mounted() {
    const element = document.getElementById('experience-scene');
    canvas(element);
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/lib/vars";
@import "../assets/styles/canvas";
</style>
