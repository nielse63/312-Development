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
    <content-section>
      <content-panel>
        <!-- staggered content boxes of open source projects -->
      </content-panel>
    </content-section>
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex';
import canvas from '@/lib/canvas/waves';
import ContentSection from '@/components/ContentSection';
import ContentPanel from '@/components/ContentPanel';

export default {
  name:       'Portfolio',
  components: {
    ContentSection,
    ContentPanel,
  },
  data() {
    return {
      title: 'Portfolio',
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
    this.setFunction(canvas);
    this.setElement(document.getElementById('portfolio-scene'));
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
