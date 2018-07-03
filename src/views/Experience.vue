<template>
  <div class="experience">
    <intro-panel
      :title="title"
      :canvas="canvas"
    ></intro-panel>
    <content-section>
      <template v-for="(panel, index) in panels">
        <content-panel :key="index" :title="panel.title">
          <!--  -->
        </content-panel>
      </template>
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
      title:  'My Experience',
      canvas,
      panels: [
        {
          title: 'Languages',
        },
        {
          title: 'Frameworks',
        },
        {
          title: 'Build Tools',
        },
        {
          title: 'Libraries',
        },
        {
          title: 'Testing',
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/lib/vars";
</style>
