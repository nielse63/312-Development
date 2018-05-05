<template>
  <img :alt="alt" :data-lazy-load="src">
</template>

<script>
  export default {
    name:  'lazy-load-image',
    props: {
      src: String,
      alt: String,
    },
    data() {
      return {
        didMount: false,
        loaded:   false,
      };
    },
    methods: {
      setSrc() {
        if (this.didMount) {
          this.$el.src = this.src;
        }
      },
    },
    created() {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = this.src;
      link.onload = () => {
        this.loaded = true;
        this.setSrc();
      };
      document.head.appendChild(link);
    },
    mounted() {
      this.didMount = true;
      if (this.loaded) {
        this.setSrc();
      }
    },
  };
</script>
