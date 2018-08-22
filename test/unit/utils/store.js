import Vuex from 'vuex';
import modules from '@/store/modules';

export default () => {
  const modulesCopy = Object.assign({}, modules);
  return new Vuex.Store({ modules, modulesCopy });
};
