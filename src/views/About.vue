<template>
  <div class="about">
    <intro-panel
      :title="title"
      :canvas="sphere"
    ></intro-panel>
    <content-section>
      <content-panel title="Who I Am">
        <p>I'm a <mark>Senior User-Interface Software Engineer and Tech Lead</mark> in Chicago, currently creating great user experiences at <external-link href="https://enova.com/">Enova</external-link>. I've been a developer and engineer since 2010, and my experience spans from Node to Ruby, and everything in between. <external-link :href="resume" title="View my resume online">Resume Here</external-link>.</p>
        <p>Aside from writing code I'm an <external-link :href="instagram">avid traveller</external-link>, triathlete and long-distance runner, and a huge fan of hiking/camping/fishing (anytning outdoors).</p>
      </content-panel>
      <content-panel title="My Contributions">
        <p>I actively contribute to open-source software, and try to publish and share my work as much as I can here. Below you'll see just how much I contribute, and to what projects:</p>
        <contributions-graph></contributions-graph>
      </content-panel>
    </content-section>
  </div>
</template>

<script>
import sphere from '@/lib/canvas/sphere';
import content from '@/lib/content';
import IntroPanel from '@/components/IntroPanel';
import ContentSection from '@/components/ContentSection';
import ContentPanel from '@/components/ContentPanel';
import ExternalLink from '@/components/ExternalLink';

export default {
  name:       'About',
  components: {
    IntroPanel,
    ContentSection,
    ContentPanel,
    ExternalLink,
    ContributionsGraph: () => import('@/components/ContributionsGraph'),
  },
  data() {
    return {
      title:     'About Me',
      sphere,
      resume:    content.resume.link,
      instagram: content.links.instagram,
    };
  },
};
</script>
