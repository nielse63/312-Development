<template>
  <div class="portfolio">
    <div class="canvas">
      <canvas class="scene scene--full" id="portfolio-scene" width="100%" height="100%"></canvas>
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
      <h1>{{title}}</h1>
    </div>
  </div>
</template>

<script>
import canvas from '@/lib/canvas/waves';

export default {
  name: 'Portfolio',
  data() {
    return {
      title: 'Portfolio',
    };
  },
  mounted() {
    const element = document.getElementById('portfolio-scene');
    canvas(element);
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/lib/vars";
@import "../assets/styles/canvas";
</style>
