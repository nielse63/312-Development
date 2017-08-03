<template>
  <div class="page about">
    <banner title="About Me" />
    <main-content />
    <open-source />
    <resume />
  </div>
</template>

<script>
  import Banner from '@/components/Banner';
  import MainContent from '@/components/About/MainContent';
  import OpenSource from '@/components/About/OpenSource';
  import Resume from '@/components/About/Resume';

  export default {
    name: 'about',
    components: {
      Banner,
      MainContent,
      OpenSource,
      Resume,
    },
  };
</script>
