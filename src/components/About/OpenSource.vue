<template>
  <section class="panel">
    <div class="container">
      <article>
        <panel-header title="Open Source Work" />
        <div class="panel__content">
          <h3>Recently Committed</h3>
          <card-row :items="repos" />
        </div>
      </article>
    </div>
  </section>
</template>

<script>
  import Octocat from '@/assets/images/octocat.png';
  import PanelHeader from '@/components/Panels/PanelHeader';
  import CardRow from '@/components/Card/CardRow';
  import { getGithubData } from '@/lib/data';

  export default {
    name: 'open-source',
    components: {
      PanelHeader,
      CardRow,
    },
    data() {
      return {
        repos: [],
      };
    },
    methods: {
      formatRepos(array) {
        return array.map(repo => Object.assign({}, repo, {
          image: Octocat,
          url: repo.html_url,
        }));
      },
    },
    beforeMount() {
      (async () => {
        try {
          const data = await getGithubData();
          this.repos = this.formatRepos(data.slice(0, 6));
        } catch (e) {
          /* istanbul ignore next */
          console.error(`ProjectsPanel: ${e}`);
        }
      })();
    },
  };
</script>
