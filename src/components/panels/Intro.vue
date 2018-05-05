<template>
  <section class="panel intro">
    <div class="container">
      <site-title
        :title="title"
        :subtitle="subtitle"
      ></site-title>
    </div>
  </section>
</template>

<script>
  import SiteTitle from '@/components/SiteTitle';

  export default {
    name: 'intro',
    components: {
      SiteTitle,
    },
    data() {
      return {
        title: 'Erik Nielsen',
        subtitle: 'Tech Lead & Senior UI Engineer',
      };
    },
    mounted() {
      // ...
    },
  };
</script>

<style lang="scss" scoped>
  @import 'src/assets/styles/lib/vars';

  $intro-padding: ($panel-padding * 2);

  @keyframes intro-background {
    0% {
      background-color: $color-green;
    }
    20% {
      background-color: $color-blue;
    }
    40% {
      background-color: $color-purple;
    }
    60% {
      background-color: $color-pink;
    }
    80% {
      background-color: $color-gray;
    }
    100% {
      background-color: $color-green;
    }
  }

  .intro {
    padding-top: $intro-padding;
    padding-bottom: $intro-padding;
    background-color: $color-green;
    animation: 50s intro-background infinite;
    color: $color-white;
  }
</style>
