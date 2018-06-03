<template>
  <div class="canvas">
    <h1 v-if="title">{{title}}</h1>
    <h2 v-if="subtitle">{{subtitle}}</h2>
    <canvas class="scene scene--full" id="scene" width="100%" height="100%"></canvas>
    <template v-if="type == 'network'">
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
    </template>
    <template v-if="type == 'waves'">
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
    </template>
  </div>
</template>

<script>
// import canvas from '@/lib/canvas';

export default {
  name:  'IntroCanvas',
  props: {
    type: {
      type:     String,
      required: true,
    },
    title:    String,
    subtitle: String,
  },
  // data() {
  //   return {
  //     canvasObject: null,
  //   };
  // },
  // mounted() {
  //   this.canvasObject = canvas(this.type);
  //   this.canvasObject.init();
  //   // console.log({
  //   //   type: this.type,
  //   // });
  //   // if (this.canvasObject.init) {
  //   //   this.canvasObject.init();
  //   // }
  // },
  // beforeDestroy() {
  //   console.log(this.canvasObject.destroy);
  //   if (this.canvasObject.destroy) {
  //     this.canvasObject.destroy();
  //   }
  // },
};
</script>

<style scoped lang="scss">
@import '../assets/styles/lib/vars';

.canvas {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  min-height: 100vh;
  color: $color-white;
  background-color: $color-black;
  text-align: center;
}

canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
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
