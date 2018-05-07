<template>
  <div class="animated-code">
    <lazy-load-image :src="src" alt="Learn more about me..."></lazy-load-image>
  </div>
</template>

<script>
  import carbon from '@/assets/images/carbon-light.png';
  import LazyLoadImage from '@/components/LazyLoadImage';

  export default {
    name:       'animated-code',
    components: {
      LazyLoadImage,
    },
    data() {
      return {
        src: carbon,
      };
    },
  };
</script>

<style lang="scss" scoped>
  @import 'src/assets/styles/lib/vars';

  .animated-code {
    position: absolute;
    top: 0;
    // left: 0;
    right: 0;
    height: 100%;
    // width: 35vw;
    width: 30vw;
    overflow: hidden;

    img {
      // -webkit-mask-image: linear-gradient(to right, $color-white 7vw, transparent 30vw);
      // mask-image: linear-gradient(to right, $color-white 7vw, transparent 30vw);
      max-width: 50vw;
    }
  }
</style>
