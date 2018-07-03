<template>
  <div class="home">
    <intro-panel
      :title="title"
      :subtitle="subtitle"
      :canvas="network"
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
import { title, subtitle } from '@/lib/content';
import titleCase from '@/lib/title-case';
import network from '@/lib/canvas/network';
import IntroPanel from '@/components/IntroPanel';
import ContentSection from '@/components/ContentSection';
import ContentPanel from '@/components/ContentPanel';
import FloatingBox from '@/components/FloatingBox';
import { shuffeImages } from '@/lib/content/images';

export default {
  name:       'Home',
  components: {
    IntroPanel,
    ContentSection,
    ContentPanel,
    FloatingBox,
  },
  data() {
    return {
      title,
      subtitle,
      network,
      images: shuffeImages(),
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
</style>
