<template>
  <div class="portfolio">
    <intro-panel
      :title="title"
      :canvas="canvas"
    ></intro-panel>
    <content-section>
      <content-panel>
        <div class="boxes">
          <template v-for="(item, i) in items">
            <floating-box v-bind="item" :index="i" :key="i"></floating-box>
          </template>
        </div>
      </content-panel>
    </content-section>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { projectImages, shuffeImages } from '@/lib/content/images';
import canvas from '@/lib/canvas/waves';
import IntroPanel from '@/components/IntroPanel';
import ContentSection from '@/components/ContentSection';
import ContentPanel from '@/components/ContentPanel';
import FloatingBox from '@/components/FloatingBox';

export default {
  name:       'Portfolio',
  components: {
    IntroPanel,
    ContentSection,
    ContentPanel,
    FloatingBox,
  },
  data() {
    return {
      title:  'Portfolio',
      canvas,
      images: shuffeImages(),
    };
  },
  computed: {
    ...mapState('portfolio', ['repos']),
    items() {
      return this.repos.splice(0, 10).map(({
        name, description, url, homepage,
      }) => {
        const image = projectImages[name] ? projectImages[name] : this.randomImage();
        return {
          title: name,
          text:  description,
          href:  url || homepage,
          image,
        };
      });
    },
  },
  methods: {
    ...mapActions('portfolio', ['fetchGitHubData']),
    randomImage() {
      const { images } = this;
      if (!images.length) {
        this.images = shuffeImages();
        return this.randomImage();
      }
      const index = Math.floor(Math.random() * images.length);
      const image = images.splice(index, 1);
      return image[0];
    },
  },
  mounted() {
    this.fetchGitHubData();
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/lib/vars";

.boxes {
  min-height: 100vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
</style>
