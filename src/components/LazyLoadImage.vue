<template>
  <img :alt="alt" :data-lazy-load="src">
  <!-- <div class="lazy-load">
    <link rel="preload" :href="src" as="image">
    <img :alt="alt" :data-lazy-load="src">
  </div> -->
</template>

<script>
  export default {
    name:  'lazy-load-image',
    props: {
      src: String,
      alt: String,
    },
    methods: {
      preload() {
        const img = this.$el;
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = this.src;
        img.offsetParent.insertBefore(link, img);
        this.$nextTick(() => {
          img.src = this.src;
        });
      },
    },
    mounted() {
      this.preload();
      // this.$el.querySelector('img').src = this.src;
    },
  };
</script>

<style lang="scss" scoped>
  // img {
  //   max-width: 50vw;
  // }
</style>

