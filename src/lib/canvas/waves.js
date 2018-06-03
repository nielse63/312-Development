import TweenMax from 'gsap/TweenMax';
import {
  WebGLRenderer, Scene, PerspectiveCamera, Geometry,
  TextureLoader, IcosahedronGeometry, BufferGeometry,
  BufferAttribute, ShaderMaterial, Points,
} from 'three';

const dotTextureImage = require('@/assets/images/dot-texture.png');

export default () => {
  const canvas = document.querySelector('#scene');
  let width = canvas.offsetWidth;
  let height = canvas.offsetHeight;

  const renderer = new WebGLRenderer({
    canvas,
    antialias: true,
  });
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
  renderer.setSize(width, height);
  renderer.setClearColor(0x59c384);

  const scene = new Scene();

  const camera = new PerspectiveCamera(50, width / height, 0.1, 2000);
  camera.position.set(0, 0, 80);

  const loader = new TextureLoader();
  loader.crossOrigin = 'Anonymous';
  const dotTexture = loader.load(dotTextureImage);

  const radius = 50;
  const sphereGeom = new IcosahedronGeometry(radius, 5);
  const dotsGeom = new Geometry();
  const bufferDotsGeom = new BufferGeometry();
  const positions = new Float32Array(sphereGeom.vertices.length * 3);

  function updateDot(index, vector) {
    positions[index * 3] = vector.x;
    positions[(index * 3) + 2] = vector.z;
  }

  function animateDot(index, vector) {
    TweenMax.to(vector, 4, {
      x:        0,
      z:        0,
      ease:     window.Back.easeOut,
      delay:    Math.abs(vector.y / radius) * 2,
      repeat:   -1,
      yoyo:     true,
      yoyoEase: window.Back.easeOut,
      onUpdate() {
        updateDot(index, vector);
      },
    });
  }

  sphereGeom.vertices.forEach((vector, i) => {
    animateDot(i, vector);
    dotsGeom.vertices.push(vector);
    vector.toArray(positions, i * 3);
  });

  const attributePositions = new BufferAttribute(positions, 3);
  bufferDotsGeom.addAttribute('position', attributePositions);
  const shaderMaterial = new ShaderMaterial({
    uniforms: {
      texture: {
        value: dotTexture,
      },
    },
    vertexShader:   document.getElementById('wrapVertexShader').textContent,
    fragmentShader: document.getElementById('wrapFragmentShader').textContent,
    transparent:    true,
  });
  const dots = new Points(bufferDotsGeom, shaderMaterial);
  scene.add(dots);

  function render() {
    requestAnimationFrame(render);
    dots.geometry.verticesNeedUpdate = true;
    dots.geometry.attributes.position.needsUpdate = true;
    renderer.render(scene, camera);
  }

  function onresize() {
    canvas.style.width = '';
    canvas.style.height = '';
    width = canvas.offsetWidth;
    height = canvas.offsetHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }

  window.addEventListener('resize', onresize, false);
  requestAnimationFrame(render);
};
