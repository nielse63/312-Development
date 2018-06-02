<template>
  <div class="contact">
    <h1>Contact Me</h1>
    <canvas class="scene scene--full" id="scene" width="100%" height="100%"></canvas>
  </div>
</template>

<script>
import canvas from '@/lib/canvas';

export default {
  name: 'Contact',
  mounted() {
    canvas('cubes');
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/styles/lib/vars';

.contact {
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

  &:before,
  &:after {
    content: '';
    position: absolute;
    top: 50%;
    height: 1px;
    background-color: #fff;
    width: 20%;
  }

  &:before {
    right: 100%;
  }

  &:after {
    left: 100%;
  }
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
