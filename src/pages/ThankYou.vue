<template>
  <div class="page thank-you">
    <banner title="Thank You" subtitle="For your submission" />
    <section class="panel">
      <div class="container container__narrow">
        <panel-header title="Thanks for contacting me!" />
        <p>In the meantime, you can also <external-link text="find me on Twitter" href="https://twitter.com/erikkylenielsen" />, or email me directly.</p>
      </div>
    </section>
  </div>
</template>

<script>
  import Banner from '@/components/Banner';
  import ExternalLink from '@/components/ExternalLink';
  import PanelHeader from '@/components/Panels/PanelHeader';

  export default {
    name: 'thank-you',
    components: {
      Banner,
      ExternalLink,
      PanelHeader,
    },
  };
</script>

<style lang="scss" scoped>
  @import "../assets/styles/main";

  a {
    color: $color-pink;
    font-weight: 700;
  }
</style>
