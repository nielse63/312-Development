<template>
  <div class="experience">
    <intro-panel
      :title="title"
      :canvas="canvas"
    ></intro-panel>
    <content-section>
      <template v-for="(panel, index) in panels">
        <content-panel :key="index" :title="panel.title">
          <ul>
            <li v-for="(item, j) in panel.items" :key="j">
              <figure v-html="item.image">
                <figcaption>{{item.title}}</figcaption>
              </figure>
            </li>
          </ul>
        </content-panel>
      </template>
    </content-section>
  </div>
</template>

<script>
import canvas from '@/lib/canvas/brain';
import IntroPanel from '@/components/IntroPanel';
import ContentSection from '@/components/ContentSection';
import ContentPanel from '@/components/ContentPanel';

export default {
  name:       'Experience',
  components: {
    IntroPanel,
    ContentSection,
    ContentPanel,
  },
  data() {
    return {
      title:  'My Experience',
      canvas,
      panels: [],
    };
  },
  methods: {
    async setPanels() {
      const languages = await import(/* webpackChunkName: 'experience-content' */ '@/lib/content/experience/languages');
      const frameworks = await import(/* webpackChunkName: 'experience-content' */ '@/lib/content/experience/frameworks');
      const buildTools = await import(/* webpackChunkName: 'experience-content' */ '@/lib/content/experience/build-tools');
      const libraries = await import(/* webpackChunkName: 'experience-content' */ '@/lib/content/experience/libraries');
      const testing = await import(/* webpackChunkName: 'experience-content' */ '@/lib/content/experience/testing');
      this.panels.push(
        languages.default,
        frameworks.default,
        buildTools.default,
        libraries.default,
        testing.default,
      );
    },
  },
  mounted() {
    this.setPanels();
  },
};
</script>

<style lang="scss">
.experience {
  svg {
    max-height: 150px;
  }
}
</style>

<style lang="scss" scoped>
@import "../assets/styles/lib/vars";

.content-section {
  &:before {
    background: linear-gradient(to bottom, #191919, transparent);
  }
}

ul {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 3em;
}

li {
  flex: 1 0 auto;
  margin: 0 1em;
}

figure {
  max-height: 150px;
  margin: 0;
}
</style>
