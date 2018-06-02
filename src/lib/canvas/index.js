import network from '@/lib/canvas/network';
import brain from '@/lib/canvas/brain';
import waves from '@/lib/canvas/waves';
import cubes from '@/lib/canvas/cubes';
import sphere from '@/lib/canvas/sphere';

const canvases = {
  network,
  brain,
  waves,
  cubes,
  sphere,
};

export default (type) => {
  if ({}.hasOwnProperty.call(canvases, type)) {
    return canvases[type]();
  }
  return console.warn(`No canvas named ${type} exists`);
};
