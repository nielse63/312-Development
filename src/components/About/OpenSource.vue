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
  // import { mapActions, mapGetters } from 'vuex';
  import { getGithubData } from '@/lib/data';
  import Octocat from '@/assets/images/octocat.png';
  import PanelHeader from '@/components/Panels/PanelHeader';
  import CardRow from '@/components/Card/CardRow';

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
    // computed: {
    //   ...mapGetters({
    //     allRepos: 'getRepos',
    //   }),
    // },
    methods: {
      formatRepos(array) {
        return array.map(repo => Object.assign({}, repo, {
          image: Octocat,
          url: repo.html_url,
        }));
      },
    },
    beforeMount() {
      getGithubData().then((data) => {
        this.repos = this.formatRepos(data.slice(0, 6));
      }, (error) => {
        console.error(error);
      });
      // if (!this.allRepos.length) {
      //   getGithubData().then((data) => {
      //     this.repos = this.formatRepos(data.slice(0, 6));
      //   }, (error) => {
      //     console.error(error);
      //   });
      // } else {
      //   this.repos = this.formatRepos(this.allRepos.slice(0, 6));
      // }
    },
  };
</script>
