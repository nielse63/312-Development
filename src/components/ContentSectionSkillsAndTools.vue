<template>
  <content-section title="Skills and Tools" @inview="inview">
    <article>
      <p>After ten years of experience I've become very familiar with the many languages, tools, paradigms, and practices that it takes to create a high-quality user interface. Below is a list of some of skills that I'm highly proficient in.</p>
      <div class="tools">
        <template v-for="(tool, i) in tools">
          <card-tool :key="i" :image="tool.image" :title="tool.title"></card-tool>
        </template>
      </div>
      <p>For detailed insight into my experience and strengths, <external-link :href="resume" title="View my resume online">check out my resume</external-link>.</p>
    </article>
  </content-section>
</template>

<script>
import anime from 'animejs';
import { resume } from '@/lib/content';
import ContentSection from '@/components/ContentSection';
import CardTool from '@/components/CardTool';
import languages from '@/lib/content/experience/languages';
import frameworks from '@/lib/content/experience/frameworks';
import buildTools from '@/lib/content/experience/build-tools';
import libraries from '@/lib/content/experience/libraries';
import testing from '@/lib/content/experience/testing';
import ExternalLink from '@/components/ExternalLink';

export default {
  name:       'ContentSectionSkillsAndTools',
  components: {
    ContentSection,
    CardTool,
    ExternalLink,
  },
  data() {
    return {
      resume: resume.link,
      tools:  [
        ...languages.items,
        ...frameworks.items,
        ...buildTools.items,
        ...libraries.items,
        ...testing.items,
      ],
    };
  },
  methods: {
    animateIcons() {
      return anime({
        targets: this.$el.querySelectorAll('.card-tool'),
        opacity: 1,
        translateY() {
          return [`${anime.random(50, 75)}vh`, '0vh'];
        },
        duration: 1000,
        easing:   'easeOutElastic',
        delay() {
          return anime.random(250, 350);
        },
        elasticity() {
          return anime.random(100, 250);
        },
        autoplay: false,
      });
    },
    inview() {
      const animation = this.animateIcons();
      this.$nextTick(() => {
        animation.play();
      });
    },
  },
};
</script>

<style scoped lang="scss">
@import "../assets/styles/lib/mixins";
@import "../assets/styles/lib/vars";

.content-section {
  display: block;
  background-image: $gradient-orange;
  text-align: center;
}

article {
  padding-top: 5vh;
}

.tools {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin: 3rem 0;
  contain: style;

  @media(max-width: $mobile-width) {
    margin-left: -5vw;
    margin-right: -5vw;
  }
}
</style>
