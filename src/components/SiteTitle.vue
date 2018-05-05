<template>
  <header class="site-title">
    <div class="titles">
      <h1>{{title}}</h1>
      <h2>{{subtitle}}</h2>
    </div>
    <div class="button-group">
      <a href="#about" class="button button__ghost--white">
        <font-awesome-icon :icon="icon" />
        Keep Reading
      </a>
    </div>
  </header>
</template>

<script>
  import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
  import faArrowDown from '@fortawesome/fontawesome-free-solid/faArrowDown';

  export default {
    name: 'site-title',
    components: {
      FontAwesomeIcon,
    },
    props: {
      title: String,
      subtitle: String,
    },
    data() {
      return {
        icon: faArrowDown,
      };
    },
  };
</script>

<style lang="scss" scoped>
  @import 'src/assets/styles/lib/vars';

  .site-title {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  }

  h1 {
    font-family: $font-family-serif;
    font-weight: 400;
    font-style: italic;
    font-size: 6rem;
    margin: 0;
  }

  h2 {
    text-transform: uppercase;
    font-size: 1.5rem;
    margin-top: 1.5em;
  }
</style>
