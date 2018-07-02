<template>
  <div class="about">
    <intro-panel
      :title="title"
      :canvas="sphere"
    ></intro-panel>
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
import sphere from '@/lib/canvas/sphere';
import IntroPanel from '@/components/IntroPanel';
import ContentSection from '@/components/ContentSection';
import ContentPanel from '@/components/ContentPanel';

export default {
  name:       'About',
  components: {
    IntroPanel,
    ContentSection,
    ContentPanel,
  },
  data() {
    return {
      title: 'About Me',
      sphere,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/lib/vars";
</style>
