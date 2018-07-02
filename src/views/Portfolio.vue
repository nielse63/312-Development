<template>
  <div class="portfolio">
    <intro-panel
      :title="title"
      :canvas="canvas"
    ></intro-panel>
    <content-section>
      <content-panel>
        <!-- staggered content boxes of open source projects -->
      </content-panel>
    </content-section>
  </div>
</template>

<script>
import canvas from '@/lib/canvas/waves';
import IntroPanel from '@/components/IntroPanel';
import ContentSection from '@/components/ContentSection';
import ContentPanel from '@/components/ContentPanel';

export default {
  name:       'Portfolio',
  components: {
    IntroPanel,
    ContentSection,
    ContentPanel,
  },
  data() {
    return {
      title: 'Portfolio',
      canvas,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/lib/vars";
</style>
