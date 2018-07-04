import {
  Scene, PerspectiveCamera, Group,
  LineBasicMaterial, Geometry, Vector3, Line,
} from 'three';
import noise from './noise';
import { getCanvasSize, onresize, createRenderer } from './utils';
import store from '../../store';

export default (canvas) => {
  const { width, height } = getCanvasSize(canvas);
  const renderer = createRenderer(canvas);

  const scene = new Scene();
  const camera = new PerspectiveCamera(40, width / height, 0.1, 1000);
  camera.position.set(0, 0, 350);

  const sphere = new Group();
  scene.add(sphere);

  const material = new LineBasicMaterial({
    color: 0xfe0e55,
  });
  const linesAmount = 18;
  const radius = 100;
  const verticesAmount = 50;

  let linesIndex = 0;
  while (linesIndex < linesAmount) {
    const geometry = new Geometry();
    geometry.y = (linesIndex / linesAmount) * radius * 2;
    let i = 0;
    while (i < verticesAmount) {
      const vector = new Vector3();
      const percentage = i / verticesAmount;
      vector.x = Math.cos(percentage * Math.PI * 2);
      vector.z = Math.sin(percentage * Math.PI * 2);
      vector.clone = vector.clone();
      geometry.vertices.push(vector);
      i += 1;
    }
    const line = new Line(geometry, material);
    sphere.add(line);
    linesIndex += 1;
  }

  function updateVector(vector, y, radiusHeight, a) {
    const ratio = noise(
      vector.x * 0.009,
      (vector.z * 0.009) + (a * 0.0006),
      y * 0.009,
    ) * 15;
    vector.copy(vector.clone);
    vector.multiplyScalar(radiusHeight + ratio);
    vector.y = y - radius;
  }

  function updateVertices(a) {
    let i = 0;
    const { length } = sphere.children;
    while (i < length) {
      const line = sphere.children[i];
      line.geometry.y += 0.3;
      if (line.geometry.y > radius * 2) {
        line.geometry.y = 0;
      }
      const radiusHeight = Math.sqrt(line.geometry.y * ((2 * radius) - line.geometry.y));

      let j = 0;
      const { vertices } = line.geometry;
      const vertLength = vertices.length;
      while (j < vertLength) {
        const vector = vertices[j];
        updateVector(vector, line.geometry.y, radiusHeight, a);
        j += 1;
      }
      line.geometry.verticesNeedUpdate = true;
      i += 1;
    }
  }

  function render(a = 0) {
    store.state.canvas.animationFrameId = requestAnimationFrame(render);
    if (store.state.canvas.paused) {
      return;
    }
    updateVertices(a);
    renderer.render(scene, camera);
  }

  window.addEventListener('resize', onresize.bind(null, canvas, camera, renderer), false);
  render();
};
