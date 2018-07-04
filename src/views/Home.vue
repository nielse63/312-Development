<template>
  <div class="home">
    <intro-panel
      :title="title"
      :subtitle="subtitle"
      :canvas="network"
    ></intro-panel>
    <content-section>
      <content-panel title="I make the Internet Prettier">
        <p>Hi! I'm Erik Nielsen, a Senior UI Software Engineer and Tech Lead from Chicago. Thanks for visiting my portfolio and taking the time to learn a little more about me. Check out the <router-link to="/about-me">About Me</router-link> to learn more about me, or visit the <router-link to="/portfolio">Portfolio</router-link> and <router-link to="/experience">Experience</router-link> pages, where I showcase my latest projects and interests.</p>
        <p>If you're just looking to grab a copy of my resume, you can <external-link :href="resume">download it here</external-link>.</p>
      </content-panel>
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
import content, { title, subtitle } from '@/lib/content';
import titleCase from '@/lib/title-case';
import network from '@/lib/canvas/network';
import IntroPanel from '@/components/IntroPanel';
import ContentSection from '@/components/ContentSection';
import ContentPanel from '@/components/ContentPanel';
import FloatingBox from '@/components/FloatingBox';
import ExternalLink from '@/components/ExternalLink';
import { shuffeImages } from '@/lib/content/images';

export default {
  name:       'Home',
  components: {
    IntroPanel,
    ContentSection,
    ContentPanel,
    FloatingBox,
    ExternalLink,
  },
  data() {
    return {
      title,
      subtitle,
      network,
      images: shuffeImages(),
      resume: content.resume.link,
    };
  },
  computed: {
    routes() {
      return this.$router.options.routes;
    },
    items() {
      return this.routes
        .filter(route => route.name !== 'home')
        .map((route, i) => ({
          title: titleCase(route.name),
          text:  route.meta.description || '',
          href:  route.path,
          image: this.images[i],
        }));
    },
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

.content-panel {
  & + & {
    border-top: 0;
  }
}
</style>
