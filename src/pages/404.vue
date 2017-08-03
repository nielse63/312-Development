<template>
  <div class="page about">
    <banner title="404 - Page Not Found" />
  <section class="panel">
    <div class="container">
      <article>
        <panel-header title="The page you're looking for wasn't there." />
      </article>
    </div>
  </section>
  </div>
</template>

<script>
  import Banner from '@/components/Banner';
  import PanelHeader from '@/components/Panels/PanelHeader';

  export default {
    name: 'FourOhFour',
    components: {
      Banner,
      PanelHeader,
    },
  };
</script>
