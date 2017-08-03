<template>
  <div class="home">
    <banner />
    <main-content />
    <projects-panel />
    <reading-panel />
  </div>
</template>

<script>
  import Banner from '@/components/Home/Banner';
  import MainContent from '@/components/About/MainContent';
  import ProjectsPanel from '@/components/Home/ProjectsPanel';
  import ReadingPanel from '@/components/Home/ReadingPanel';

  export default {
    name: 'home',
    components: {
      Banner,
      MainContent,
      ProjectsPanel,
      ReadingPanel,
    },
    data() {
      return {
        msg: 'Welcome to Your Vue.js PWA',
      };
    },
  };
</script>
