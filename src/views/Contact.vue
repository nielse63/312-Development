<template>
  <div class="contact">
    <div class="canvas">
      <canvas class="scene scene--full" id="contact-scene" width="100%" height="100%"></canvas>
      <h1>{{title}}</h1>
    </div>
    <content-section>
      <content-panel>
        <!-- form containing name, email, url, message -->
      </content-panel>
    </content-section>
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex';
import canvas from '@/lib/canvas/cubes';
import ContentSection from '@/components/ContentSection';
import ContentPanel from '@/components/ContentPanel';

export default {
  name:       'Contact',
  components: {
    ContentSection,
    ContentPanel,
  },
  data() {
    return {
      title: 'Contact Me',
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
    this.setElement(document.getElementById('contact-scene'));
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
