<template>
  <div class="about">
    <h1>About Me</h1>
    <!-- <h2>Senior UI Software Engineer from Chicago, IL</h2> -->
    <canvas class="scene scene--full" id="scene" width="100%" height="100%"></canvas>
    <script type="x-shader/x-vertex" id="wrapVertexShader">
      #define PI 3.1415926535897932384626433832795
      attribute float size;
      void main() {
        vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
        gl_PointSize = 3.0;
        gl_Position = projectionMatrix * mvPosition;
      }
    </script>
    <script type="x-shader/x-fragment" id="wrapFragmentShader">
      uniform sampler2D texture;
      void main(){
        vec4 textureColor = texture2D( texture, gl_PointCoord );
        if ( textureColor.a < 0.3 ) discard;
        vec4 dotColor = vec4(0.06, 0.18, 0.36, 0.4);
        vec4 color = dotColor * textureColor;
        gl_FragColor = color;
      }
    </script>
  </div>
</template>

<script>
import canvas from '@/lib/canvas';

export default {
  name: 'About',
  mounted() {
    // canvas('waves');
    canvas('cubes');
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/styles/lib/vars';

.about {
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
