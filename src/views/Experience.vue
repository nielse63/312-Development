<template>
  <div class="experience">
    <h1>Experience</h1>
    <canvas class="scene scene--full" id="scene"></canvas>
  </div>
</template>

<script>
import canvas from '@/lib/canvas';

export default {
  name: 'Experience',
  mounted() {
    canvas('brain');
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/styles/lib/vars';

.experience {
  display: grid;
  justify-content: center;
  align-items: center;
  align-content: center;
  margin: 0 auto;
  min-height: 100vh;
  color: #fff;
  text-align: center;
}

h1 {
  margin: 0;
  font-family: $font-family-serif;
  font-size: 10vw;
}

canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
}
</style>
