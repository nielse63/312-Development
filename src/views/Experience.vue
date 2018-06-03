<template>
  <div class="experience">
    <intro-canvas
      :type="type"
      :title="title"
    ></intro-canvas>
  </div>
</template>

<script>
import IntroCanvas from '@/components/IntroCanvas';

export default {
  name:       'Experience',
  components: {
    IntroCanvas,
  },
  data() {
    return {
      type:  'brain',
      title: 'My Experience',
    };
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/styles/lib/vars';

.experience {
  // ...
}
</style>
