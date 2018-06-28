<template>
  <div class="home">
    <div class="canvas">
      <canvas class="scene scene--full" id="home-scene" width="100%" height="100%"></canvas>
      <script type="x-shader/x-vertex" id="wrapVertexShader">
        attribute float size;
        attribute vec3 color;
        varying vec3 vColor;
        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
          gl_PointSize = size * ( 350.0 / - mvPosition.z );
          gl_Position = projectionMatrix * mvPosition;
        }
      </script>
      <script type="x-shader/x-fragment" id="wrapFragmentShader">
        varying vec3 vColor;
        uniform sampler2D texture;
        void main(){
          vec4 textureColor = texture2D( texture, gl_PointCoord );
          if ( textureColor.a < 0.3 ) discard;
          vec4 color = vec4(vColor.xyz, 1.0) * textureColor;
          gl_FragColor = color;
        }
      </script>
      <h1>{{title}}</h1>
      <h2>{{subtitle}}</h2>
    </div>
  </div>
</template>

<script>
import { title, subtitle } from '@/lib/content';
import canvas from '@/lib/canvas/network';

export default {
  name: 'Home',
  data() {
    return {
      title,
      subtitle,
    };
  },
  mounted() {
    const element = document.getElementById('home-scene');
    canvas(element);
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/lib/vars";
@import "../assets/styles/canvas";

.canvas {
  height: 100vh;
}

h1 {
  font-size: 10vw;
}
</style>
