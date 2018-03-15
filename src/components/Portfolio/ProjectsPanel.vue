<template>
  <section class="panel">
    <div class="container">
      <panel-header title="NPM Modules" />
      <template v-for="project in projects">
        <project-item :title="project" />
      </template>
    </div>
  </section>
</template>

<script>
  import PanelHeader from '@/components/Panels/PanelHeader';
  import ProjectItem from '@/components/Portfolio/ProjectItem';
  import { getGithubData } from '@/lib/data';

  export default {
    name: 'projects-panel',
    components: {
      PanelHeader,
      ProjectItem,
    },
    data() {
      return {
        projects: [],
      };
    },
    methods: {
      loadChart() {
        return new Promise((resolve) => {
          if (window.Highcharts) {
            resolve();
          } else {
            const resource = document.createElement('script');
            resource.src = 'https://cdnjs.cloudflare.com/ajax/libs/highcharts/5.0.14/highcharts.js';
            resource.onload = () => {
              resolve();
            };
            const script = document.getElementsByTagName('script')[0];
            script.parentNode.insertBefore(resource, script);
          }
        });
      },
    },
    async beforeMount() {
      this.loadChart().then(() => {
        this.projects = [
          'expand-hex-code',
          'minify-hex-code',
          'if-is-image',
          'jquery.resizeend',
          'launch-checklist',
          'minify-images',
          'site-launch-checklist',
          'tinyqueue.js',
        ];
      });
      await getGithubData();
    },
  };
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/main";
</style>
