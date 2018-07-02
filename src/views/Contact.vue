<template>
  <div class="contact">
    <intro-panel
      :title="title"
      :canvas="canvas"
    ></intro-panel>
    <content-section>
      <content-panel>
        <!-- form containing name, email, url, message -->
      </content-panel>
    </content-section>
  </div>
</template>

<script>
import canvas from '@/lib/canvas/cubes';
import IntroPanel from '@/components/IntroPanel';
import ContentSection from '@/components/ContentSection';
import ContentPanel from '@/components/ContentPanel';

export default {
  name:       'Contact',
  components: {
    IntroPanel,
    ContentSection,
    ContentPanel,
  },
  data() {
    return {
      title: 'Contact Me',
      canvas,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/lib/vars";
</style>
