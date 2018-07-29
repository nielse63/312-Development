<template>
  <content-section title="Experience" @inview="inview">
    <article>
      <div class="boxes">
        <template v-for="(box, i) in boxes">
          <experience-box
            :key="i"
            :inview="isInView"
            :header="box.header"
            :description="box.description"
          ></experience-box>
        </template>
      </div>
    </article>
    <footer>
      <p>To learn more about my experience, skills, and background, <external-link :href="resume" title="View my resume online">check out my resume</external-link>.</p>
    </footer>
  </content-section>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { resume } from '@/lib/content';
import ContentSection from '@/components/ContentSection';
import ExperienceBox from '@/components/ExperienceBox';
import ExternalLink from '@/components/ExternalLink';

export default {
  name:       'ContentSectionExperience',
  components: {
    ContentSection,
    ExperienceBox,
    ExternalLink,
  },
  data() {
    return {
      resume:   resume.link,
      isInView: false,
    };
  },
  computed: {
    ...mapState('portfolio', ['stats']),
    boxes() {
      return [
        {
          header:      '10',
          description: 'years as a software engineer',
        },
        {
          header:      this.stats.repos,
          description: 'public github repos',
        },
        // {
        //   header:      this.stats.commits,
        //   description: 'git commits',
        // },
        {
          header:      this.stats.stars,
          description: 'github stars',
        },
        {
          header:      this.stats.gists,
          description: 'public gists',
        },
        {
          header:      this.stats.packages,
          description: 'published node modules',
        },
        {
          header:      this.stats.downloads,
          description: 'downloads of my npm packages',
        },
      ];
    },
  },
  methods: {
    ...mapActions('portfolio', [
      'fetchRepos',
      'fetchGithubUser',
      'fetchGists',
      'fetchNPMPackages',
    ]),
    inview() {
      this.isInView = true;
    },
  },
  mounted() {
    this.$nextTick()
      .then(() => this.fetchGithubUser())
      .then(() => this.fetchRepos())
      .then(() => this.fetchGists())
      .then(() => this.fetchNPMPackages());
  },
};
</script>

<style scoped lang="scss">
@import "../assets/styles/lib/mixins";
@import "../assets/styles/lib/vars";

.content-section {
  display: block;
  background-image: linear-gradient(to bottom, $color-blue-dark, $color-blue-light);
  color: $color-white;
}

article {
  padding: 5vh 10vw;
  line-height: 1;
  text-align: center;
  font-weight: 700;
}

.boxes {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  position: relative;
  contain: style;

  &:before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, 0);
    width: 50%;
    height: 1px;
    background-color: $color-white;
  }
}

footer {
  padding: 0 10vw 7.5vh;
  text-align: center;
}
</style>
