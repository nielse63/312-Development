<template>
  <div class="home">
    <intro-panel
      :title="title"
      :subtitle="subtitle"
      :canvas="network"
    ></intro-panel>
    <content-section>
      <content-panel>
        <!-- this is the intro content -->
      </content-panel>
      <content-panel>
        <!-- this section should have staggered blocks on cont -->
      </content-panel>
    </content-section>
  </div>
</template>

<script>
import { title, subtitle } from '@/lib/content';
import network from '@/lib/canvas/network';
import IntroPanel from '@/components/IntroPanel';
import ContentSection from '@/components/ContentSection';
import ContentPanel from '@/components/ContentPanel';

export default {
  name:       'Home',
  components: {
    IntroPanel,
    ContentSection,
    ContentPanel,
  },
  data() {
    return {
      title,
      subtitle,
      network,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/lib/vars";
</style>
