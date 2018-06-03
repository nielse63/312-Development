<template>
  <div class="portfolio">
    <intro-canvas
      :type="type"
      :title="title"
    ></intro-canvas>
  </div>
</template>

<script>
import IntroCanvas from '@/components/IntroCanvas';

export default {
  name:       'Portfolio',
  components: {
    IntroCanvas,
  },
  data() {
    return {
      type:  'waves',
      title: 'Portfolio',
    };
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/styles/lib/vars';

.portfolio {
  // ...
}
</style>
