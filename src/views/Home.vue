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
    <content-section>
      <content-panel>
        <!-- this is the intro content -->
      </content-panel>
      <content-panel>
        <!-- this section should have staggered blocks on cont -->
      </content-panel>
    </content-section>
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex';
import { title, subtitle } from '@/lib/content';
import network from '@/lib/canvas/network';
import ContentSection from '@/components/ContentSection';
import ContentPanel from '@/components/ContentPanel';

export default {
  name:       'Home',
  components: {
    ContentSection,
    ContentPanel,
  },
  data() {
    return {
      title,
      subtitle,
    };
  },
  methods: {
    ...mapMutations('canvas', [
      'setFunction',
      'setElement',
    ]),
    ...mapActions('canvas', {
      startCanvas: 'start',
      stopCanvas:  'stop',
    }),
  },
  mounted() {
    this.setFunction(network);
    this.setElement(document.getElementById('home-scene'));
    this.startCanvas();
  },
  beforeDestroy() {
    this.stopCanvas();
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/lib/vars";
@import "../assets/styles/canvas";
</style>
