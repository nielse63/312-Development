<template>
  <div class="home">
    <intro-canvas
      :type="type"
      :title="title"
      :subtitle="subtitle"
    ></intro-canvas>
  </div>
</template>

<script>
import IntroCanvas from '@/components/IntroCanvas';

export default {
  name:       'Home',
  components: {
    IntroCanvas,
  },
  data() {
    return {
      type:     'network',
      title:    'Erik Nielsen',
      subtitle: 'Senior UI Software Engineer from Chicago, IL',
    };
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/styles/lib/vars';

.home {
  // ...
}
</style>
