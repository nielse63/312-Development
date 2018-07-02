<template>
  <div class="experience">
    <div class="canvas">
      <canvas class="scene scene--full" id="experience-scene" width="100%" height="100%"></canvas>
      <h1>{{title}}</h1>
    </div>
    <content-section>
      <content-panel>
        <!-- languages -->
      </content-panel>
      <content-panel>
        <!-- frameworks -->
      </content-panel>
      <content-panel>
        <!-- build tools -->
      </content-panel>
      <content-panel>
        <!-- libraries -->
      </content-panel>
      <content-panel>
        <!-- other -->
      </content-panel>
    </content-section>
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex';
import canvas from '@/lib/canvas/brain';
import ContentSection from '@/components/ContentSection';
import ContentPanel from '@/components/ContentPanel';

export default {
  name:       'Experience',
  components: {
    ContentSection,
    ContentPanel,
  },
  data() {
    return {
      title: 'My Experience',
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
    this.setElement(document.getElementById('experience-scene'));
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
