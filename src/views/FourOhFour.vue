<template>
  <div class="four-oh-four">
    <intro-panel
      :title="title"
      :subtitle="subtitle"
      :canvas="sphere"
    ></intro-panel>
  </div>
</template>

<script>
import sphere from '@/lib/canvas/sphere';
import content from '@/lib/content';
import IntroPanel from '@/components/IntroPanel';

export default {
  name:       'FourOhFour',
  components: {
    IntroPanel,
  },
  data() {
    return {
      title:    'Page Not Found',
      subtitle: content.four04.description,
      sphere,
    };
  },
};
</script>
