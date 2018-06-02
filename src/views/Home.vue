<template>
  <div class="home">
    <h1>Erik Nielsen</h1>
    <h2>Senior UI Software Engineer from Chicago, IL</h2>
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
  </div>
</template>

<script>
import canvas from '@/lib/canvas';

export default {
  name: 'Home',
  mounted() {
    canvas('network');
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/styles/lib/vars';

.home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  min-height: 100vh;
  color: $color-white;
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

canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
}
</style>
