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
import canvas from '@/lib/canvas/waves';
import IntroPanel from '@/components/IntroPanel';
import ContentSection from '@/components/ContentSection';
import ContentPanel from '@/components/ContentPanel';
import FloatingBox from '@/components/FloatingBox';
import PlaceholderImage from '@/assets/images/placeholder.jpg';

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
      title: 'Portfolio',
      canvas,
      items: [
        {
          title: 'Something',
          text:  'lorem ipsum dolor sit amet...',
          href:  'https://google.com',
          image: PlaceholderImage,
        },
        {
          title: 'Something',
          text:  'lorem ipsum dolor sit amet...',
          href:  'https://google.com',
          image: PlaceholderImage,
        },
        {
          title: 'Something',
          text:  'lorem ipsum dolor sit amet...',
          href:  'https://google.com',
          image: PlaceholderImage,
        },
        {
          title: 'Something',
          text:  'lorem ipsum dolor sit amet...',
          href:  'https://google.com',
          image: PlaceholderImage,
        },
        {
          title: 'Something',
          text:  'lorem ipsum dolor sit amet...',
          href:  'https://google.com',
          image: PlaceholderImage,
        },
        {
          title: 'Something',
          text:  'lorem ipsum dolor sit amet...',
          href:  'https://google.com',
          image: PlaceholderImage,
        },
        {
          title: 'Something',
          text:  'lorem ipsum dolor sit amet...',
          href:  'https://google.com',
          image: PlaceholderImage,
        },
        {
          title: 'Something',
          text:  'lorem ipsum dolor sit amet...',
          href:  'https://google.com',
          image: PlaceholderImage,
        },
      ],
    };
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
