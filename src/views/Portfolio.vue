<template>
  <div class="portfolio">
    <intro-panel
      :title="title"
      :canvas="canvas"
    ></intro-panel>
    <content-section>
      <content-panel>
        <template v-for="(repo, i) in repos">
          <portfolio-item v-bind="repo" :key="i"></portfolio-item>
        </template>
      </content-panel>
    </content-section>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import canvas from '@/lib/canvas/waves';
import IntroPanel from '@/components/IntroPanel';
import ContentSection from '@/components/ContentSection';
import ContentPanel from '@/components/ContentPanel';
import PortfolioItem from '@/components/PortfolioItem';

export default {
  name:       'Portfolio',
  components: {
    IntroPanel,
    ContentSection,
    ContentPanel,
    PortfolioItem,
  },
  data() {
    return {
      canvas,
      title: 'Portfolio',
    };
  },
  computed: {
    ...mapState('portfolio', ['repos']),
  },
  methods: {
    ...mapActions('portfolio', ['fetchRepos']),
  },
  mounted() {
    this.$nextTick().then(() => {
      this.fetchRepos();
    });
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/lib/vars";

.content-section {
  &:before {
    background: linear-gradient(to bottom, #59c384, transparent);
  }
}
</style>
