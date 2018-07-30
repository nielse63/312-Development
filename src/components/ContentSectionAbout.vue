<template>
  <content-section title="About Me" @inview="inview">
    <article v-once>
      <p>I'm a <mark>Senior User-Interface Software Engineer and Tech Lead</mark> in Chicago, currently creating great user experiences at <external-link href="https://enova.com/">Enova International</external-link>. I've been a developer and engineer since 2010, and my experience spans from Node to Ruby, and everything in between. <external-link :href="resume" title="View my resume online">Resume Here</external-link>.</p>
      <p>Aside from writing code I'm an <external-link :href="instagram">avid traveller</external-link>, triathlete and long-distance runner, and a huge fan of hiking/camping/fishing (anytning outdoors).</p>
    </article>
  </content-section>
</template>

<script>
import anime from 'animejs';
import { resume, links } from '@/lib/content';
import ContentSection from '@/components/ContentSection';
import ExternalLink from '@/components/ExternalLink';

export default {
  name:       'ContentSectionAbout',
  components: {
    ContentSection,
    ExternalLink,
  },
  data() {
    return {
      resume:    resume.link,
      instagram: links.instagram,
    };
  },
  methods: {
    animateContent() {
      return anime({
        targets: this.$el.querySelectorAll('article p'),
        opacity: 1,
        translateX() {
          return [`${anime.random(50, 75)}vw`, '0vw'];
        },
        duration: 1000,
        easing:   'easeOutElastic',
        delay(target, index) {
          return (index * anime.random(0, 150)) + 50;
        },
        elasticity() {
          return anime.random(50, 100);
        },
        autoplay: false,
      });
    },
    inview() {
      const animation = this.animateContent();
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
  align-items: center;

  @media(min-width: $desktop-width) {
    min-height: 100vh;
  }

  &:before {
    content: "";
    @include size(100%);
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    background-image: $gradient-purple;

    @media (min-width: $desktop-width) {
      clip-path: polygon(54% 0%, 100% 0%, 100% 100%, 32% 100%);
    }
  }
}

article {
  text-shadow: 0.05em 0.05em 1em fade-out($color-black, 0.65);
  contain: style;

  @media (min-width: $desktop-width) {
    padding-left: 2rem;
  }
}

p {
  opacity: 0;
}
</style>
