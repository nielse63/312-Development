<template>
  <a :href="selector" class="button" @click.prevent="scrollto">
    <font-awesome-icon :icon="icon" />
    <slot></slot>
  </a>
</template>

<script>
  import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
  import faArrowDown from '@fortawesome/fontawesome-free-solid/faArrowDown';

  export default {
    name:       'scroll-to',
    components: {
      FontAwesomeIcon,
    },
    props: {
      selector: {
        type:     String,
        required: true,
      },
    },
    data() {
      return {
        icon: faArrowDown,
      };
    },
    methods: {
      scrollto({ target }) {
        const id = target.getAttribute('href');
        const element = document.querySelector(id);
        if (!element) {
          return;
        }
        const { offsetTop } = element;
        window.scrollTo({
          top:      offsetTop,
          left:     0,
          behavior: 'smooth',
        });
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import 'src/assets/styles/lib/vars';
</style>
