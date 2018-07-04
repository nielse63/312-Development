<template>
  <div class="canvas">
    <canvas class="scene scene--full" id="scene" width="100%" height="100%"></canvas>
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
      <script type="x-shader/x-vertex" id="wrapWavesVertexShader">
        #define PI 3.1415926535897932384626433832795
        attribute float size;
        void main() {
          vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
          gl_PointSize = 3.0;
          gl_Position = projectionMatrix * mvPosition;
        }
      </script>
      <script type="x-shader/x-fragment" id="wrapWavesFragmentShader">
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
    <h2 v-if="subtitle">{{subtitle}}</h2>
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex';

export default {
  name:  'IntroPanel',
  props: {
    canvas:   Function,
    title:    String,
    subtitle: String,
  },
  data() {
    return {
      // bound:  false,
      height: 0,
      h1:     null,
      h2:     null,
    };
  },
  methods: {
    ...mapMutations('canvas', [
      'setFunction',
      'setElement',
    ]),
    ...mapActions('canvas', ['start']),
    onscroll() {
      const y = window.scrollY;
      const { height } = this;
      if (y > height) {
        return;
      }
      const percentage = y / height;
      const translateY = percentage * -100;
      const translateZ = Math.abs(translateY);
      const opacity = 1 - percentage;
      const { h1, h2 } = this;
      h1.style.transform = `translate3d(0, ${translateY}px, ${translateZ}px)`;
      h1.style.opacity = opacity;
      if (h2) {
        const h2translateY = translateY / 2;
        h2.style.transform = `translate(0, ${h2translateY}px)`;
        h2.style.opacity = opacity;
      }
    },
    setElements() {
      this.height = this.$el.clientHeight;
      this.h1 = this.$el.querySelector('h1');
      this.h2 = this.$el.querySelector('h2');
    },
  },
  beforeMount() {
    window.removeEventListener('scroll', this.onscroll, false);
    window.addEventListener('scroll', this.onscroll, false);
  },
  mounted() {
    this.setElements();
    this.$nextTick()
      .then(() => {
        this.setFunction(this.canvas);
        this.setElement(this.$el.querySelector('#scene'));
      })
      .then(() => {
        this.start();
      });
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.onscroll, false);
  },
};
</script>

<style scoped lang="scss">
@import "../assets/styles/lib/vars";

.canvas {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  height: 100vh;
  max-height: 600px;
  min-height: 450px;
  position: relative;
  color: $color-white;
  text-align: center;
  perspective: 100vw;
}

canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;

  ~ * {
    z-index: 1;
  }
}

h1,
h2 {
  will-change: transform, opacity;
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
    content: "";
    position: absolute;
    top: 50%;
    height: 1px;
    background-color: $color-white;
    width: 20%;
  }

  &:before {
    right: 100%;
  }

  &:after {
    left: 100%;
  }
}
</style>
