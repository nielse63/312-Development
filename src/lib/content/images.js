import ForestImage from '@/assets/images/forest.jpg';
import FogImage from '@/assets/images/fog.jpg';
import MountainImage from '@/assets/images/mountains.jpg';
import BeachImage from '@/assets/images/beach.jpg';
import CoastLineImage from '@/assets/images/coastline.jpg';
import MountainPassImage from '@/assets/images/mountain-pass.jpg';
import WebGLDecorativeBackgroundsImage from '@/assets/images/WebGL-Decorative-Backgrounds.jpg';
import NodeSimplexNoiseImage from '@/assets/images/node-simplex-noise.jpg';
import GekkoImage from '@/assets/images/gekko.jpg';

const images = {
  forest:       ForestImage,
  fog:          FogImage,
  mountains:    MountainImage,
  beach:        BeachImage,
  coastline:    CoastLineImage,
  mountainPass: MountainPassImage,
};

export const projectImages = {
  'WebGL-Decorative-Backgrounds': WebGLDecorativeBackgroundsImage,
  'node-simplex-noise':           NodeSimplexNoiseImage,
  gekko:                          GekkoImage,
};

export const shuffeImages = () => {
  const output = Object.values(images)
    .map(a => [Math.random(), a])
    .sort((a, b) => a[0] - b[0])
    .map(a => a[1]);
  return output;
};
export default images;
