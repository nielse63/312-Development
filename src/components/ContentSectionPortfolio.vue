<template>
  <content-section title="Selected Work" id="portfolio">
    <article>
      <p>I'm a <mark>Senior User-Interface Software Engineer and Tech Lead</mark> in Chicago, currently creating great user experiences at <external-link href="https://enova.com/">Enova International</external-link>. I've been a developer and engineer since 2010, and my experience spans from Node to Ruby, and everything in between. <external-link :href="resume" title="View my resume online">Resume Here</external-link>.</p>
      <p>Aside from writing code I'm an <external-link :href="instagram">avid traveller</external-link>, triathlete and long-distance runner, and a huge fan of hiking/camping/fishing (anytning outdoors).</p>
    </article>
  </content-section>
</template>

<script>
import content from '@/lib/content';
import ContentSection from '@/components/ContentSection';
import ExternalLink from '@/components/ExternalLink';

export default {
  name:       'ContentSectionPortfolio',
  components: {
    ContentSection,
    ExternalLink,
  },
  data() {
    return {
      resume:    content.resume.link,
      instagram: content.links.instagram,
    };
  },
};
</script>

<style scoped lang="scss">
@import "../assets/styles/lib/mixins";
@import "../assets/styles/lib/vars";

.content-section {
  flex-direction: row-reverse;

  &:before {
    content: "";
    @include size(100%);
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    background-image: linear-gradient(#de6cff, #bc41df);
    clip-path: polygon(0% 0%, 47% 0%, 60% 100%, 0% 100%);
  }
}

article {
  padding-right: 1rem;
}
</style>
