<template>
  <content-section title="About Me">
    <article v-in-view>
      <p>I'm a <mark>Senior User-Interface Software Engineer and Tech Lead</mark> in Chicago, currently creating great user experiences at <external-link href="https://enova.com/" title="Enova International">Enova International</external-link>. I've been a developer and engineer since 2010, and my experience spans from Node to Ruby, and everything in between. <external-link :href="resume" title="View my resume online">Resume Here</external-link>.</p>
      <p>Aside from writing code I'm an <external-link :href="instagram" title="nielse63 on Instagram">avid traveller</external-link>, triathlete and long-distance runner, and a huge fan of hiking/camping/fishing (anytning outdoors).</p>
    </article>
  </content-section>
</template>

<script>
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
  transform: translate(50px, 0);
  transition: 0.35s ease-in-out 1s;
  transition-property: transform, opacity;

  [data-in-view="true"] & {
    opacity: 1;
    transform: translate(0, 0);
    transition-delay: 0s;
  }
}
</style>
