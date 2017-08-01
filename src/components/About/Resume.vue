<template>
  <section class="panel">
    <div class="container">
      <article>
        <panel-header title="Resume" />
        <div class="panel__content">
          <timeline />
        </div>
      </article>
    </div>
  </section>
</template>

<script>
  import PanelHeader from '@/components/Panels/PanelHeader';
  import Timeline from '@/components/Timeline/Timeline';

  export default {
    name: 'resume',
    components: {
      PanelHeader,
      Timeline,
    },
  };
</script>
