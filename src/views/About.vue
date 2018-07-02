<template>
  <div class="about">
    <div class="canvas">
      <canvas class="scene scene--full" id="about-scene" width="100%" height="100%"></canvas>
      <h1>{{title}}</h1>
    </div>
    <content-section>
      <content-panel>
        <!-- intro content -->
      </content-panel>
      <content-panel>
        <!-- graph of github and npm contributions -->
      </content-panel>
    </content-section>
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex';
import sphere from '@/lib/canvas/sphere';
import ContentSection from '@/components/ContentSection';
import ContentPanel from '@/components/ContentPanel';

export default {
  name:       'About',
  components: {
    ContentSection,
    ContentPanel,
  },
  data() {
    return {
      title: 'About Me',
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
    this.setFunction(sphere);
    this.setElement(document.getElementById('about-scene'));
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
