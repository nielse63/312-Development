import Vue from 'vue';
import * as THREE from 'three';
import noise from '@/lib/canvas/noise';
import { getCanvas } from '@/lib/canvas/utils';

export default () => {
  const canvasObject = getCanvas();
  const { canvas } = canvasObject;
  let { width, height } = canvasObject;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
  });
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
  renderer.setSize(width, height);
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
  camera.position.set(0, 0, 350);

  const sphere = new THREE.Group();
  scene.add(sphere);

  const material = new THREE.LineBasicMaterial({
    color: 0xfe0e55,
  });
  const linesAmount = 18;
  const radius = 100;
  const verticesAmount = 50;

  let linesIndex = 0;
  while (linesIndex < linesAmount) {
    const geometry = new THREE.Geometry();
    geometry.y = (linesIndex / linesAmount) * radius * 2;
    let i = 0;
    while (i < verticesAmount) {
      const vector = new THREE.Vector3();
      vector.x = Math.cos(i / verticesAmount * Math.PI * 2);
      vector.z = Math.sin(i / verticesAmount * Math.PI * 2);
      vector.clone = vector.clone();
      geometry.vertices.push(vector);
      i += 1;
    }
    const line = new THREE.Line(geometry, material);
    sphere.add(line);
    linesIndex += 1;
  }

  function updateVertices(a) {
    sphere.children.forEach((line) => {
      line.geometry.y += 0.3;
      if (line.geometry.y > radius * 2) {
        line.geometry.y = 0;
      }
      const radiusHeight = Math.sqrt(line.geometry.y * (2 * radius - line.geometry.y));
      line.geometry.vertices.forEach((vector) => {
        const ratio = noise(
          vector.x * 0.009,
          vector.z * 0.009 + a * 0.0006,
          line.geometry.y * 0.009,
        ) * 15;
        vector.copy(vector.clone);
        vector.multiplyScalar(radiusHeight + ratio);
        vector.y = line.geometry.y - radius;
      });
      line.geometry.verticesNeedUpdate = true;
    });
  }

  function render(a) {
    requestAnimationFrame(render);
    updateVertices(a);
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

  requestAnimationFrame(render);
  window.addEventListener('resize', () => {
    Vue.nextTick().then(onresize);
  });
};