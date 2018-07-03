<template>
  <div class="home">
    <intro-panel
      :title="title"
      :subtitle="subtitle"
      :canvas="network"
    ></intro-panel>
    <content-section>
      <!--  -->
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
