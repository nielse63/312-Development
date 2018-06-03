<template>
  <div class="about">
    <intro-canvas
      :type="type"
      :title="title"
    ></intro-canvas>
  </div>
</template>

<script>
import IntroCanvas from '@/components/IntroCanvas';

export default {
  name:       'About',
  components: {
    IntroCanvas,
  },
  data() {
    return {
      type:  'sphere',
      title: 'About Me',
    };
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/styles/lib/vars';

.about {
  // ...
}
</style>
