<template>
  <section class="panel">
    <div class="container">
      <article>
        <panel-header title="About Me" />
        <about-content />
      </article>
    </div>
  </section>
</template>

<script>
  import PanelHeader from '@/components/Panels/PanelHeader';
  import AboutContent from '@/components/About/AboutContent';

  export default {
    name: 'main-content',
    components: {
      PanelHeader,
      AboutContent,
    },
  };
</script>
