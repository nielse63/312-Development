<template>
  <div class="experience">
    <intro-panel
      :title="title"
      :canvas="canvas"
    ></intro-panel>
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
import canvas from '@/lib/canvas/brain';
import IntroPanel from '@/components/IntroPanel';
import ContentSection from '@/components/ContentSection';
import ContentPanel from '@/components/ContentPanel';

export default {
  name:       'Experience',
  components: {
    IntroPanel,
    ContentSection,
    ContentPanel,
  },
  data() {
    return {
      title: 'My Experience',
      canvas,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/lib/vars";

.content-panel {
  & + & {
    border-top: 1px solid $color-black;
  }
}
</style>
