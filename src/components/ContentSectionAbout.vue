<template>
  <content-section title="About Me">
    <article>
      <p>I'm a <mark>Senior User-Interface Software Engineer and Tech Lead</mark> in Chicago, currently creating great user experiences at <external-link href="https://enova.com/">Enova International</external-link>. I've been a developer and engineer since 2010, and my experience spans from Node to Ruby, and everything in between. <external-link :href="resume" title="View my resume online">Resume Here</external-link>.</p>
      <p>Aside from writing code I'm an <external-link :href="instagram">avid traveller</external-link>, triathlete and long-distance runner, and a huge fan of hiking/camping/fishing (anytning outdoors).</p>
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

  &:before {
    content: "";
    @include size(100%);
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    background-image: linear-gradient(to bottom, #852d91, #312a6c);
    clip-path: polygon(60% 0%, 100% 0%, 100% 100%, 29% 100%);
    transition: $content-section-transition;
    // transition-delay: 0.5s;
  }
}

article {
  padding-left: 2rem;
  @include basic-content-transform;
}

.visible {
  &:before {
    clip-path: polygon(53% 0%, 100% 0%, 100% 100%, 40% 100%);
    transition-delay: 0s;
  }
}
</style>
