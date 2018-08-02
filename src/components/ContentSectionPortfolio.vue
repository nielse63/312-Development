<template>
  <content-section title="Selected Work" id="portfolio">
    <article>
      <div class="cards">
        <template v-for="(card, i) in cards">
          <card-portfolio
            :key="i"
            :inview="isInView"
            :title="card.title"
            :image="card.image"
            :url="card.url"
          ></card-portfolio>
        </template>
      </div>
    </article>
  </content-section>
</template>

<script>
import ContentSection from '@/components/ContentSection';
import CardPortfolio from '@/components/CardPortfolio';
import MountainImage from '@/assets/images/mountains.jpg';
import RoadImage from '@/assets/images/road.jpg';
import PoolImage from '@/assets/images/pool.jpg';
import PlaceholderImage from '@/assets/images/placeholder.jpg';

export default {
  name:       'ContentSectionPortfolio',
  components: {
    ContentSection,
    CardPortfolio,
  },
  data() {
    return {
      isInView: false,
      cards:    [
        {
          title: '312 Development',
          url:   'https://github.com/nielse63/312-Development',
          image: MountainImage,
        },
        {
          title: '@nielse63/eslint-config',
          url:   'https://github.com/nielse63/nielse63/tree/master/packages/eslint-config',
          image: RoadImage,
        },
        {
          title: 'WebGL Backgrounds',
          url:   'https://github.com/nielse63/WebGL-Decorative-Backgrounds',
          image: PoolImage,
        },
        {
          title: 'Node Simplex Noise',
          url:   'https://github.com/nielse63/node-simplex-noise',
          image: PlaceholderImage,
        },
        {
          title: 'tinyqueue.js',
          url:   'https://github.com/nielse63/tinyqueue.js',
          image: MountainImage,
        },
        {
          title: '@nielse63/debounce',
          url:   'https://github.com/nielse63/nielse63/tree/master/packages/debounce',
          image: RoadImage,
        },
      ],
    };
  },
};
</script>

<style scoped lang="scss">
@import "../assets/styles/lib/mixins";
@import "../assets/styles/lib/vars";

.content-section {
  flex-direction: row-reverse;
  align-items: center;

  @media(max-width: $tablet-width) {
    display: block;
  }

  &:before {
    content: "";
    @include size(100%);
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    background-image: $gradient-pink;

    @media (min-width: $mobile-width) {
      clip-path: polygon(0 0, 31% 0, 71% 100%, 0 100%);
    }
  }
}

article {
  @media(max-width: $tablet-width) {
    padding-top: 0;
  }

  @media (min-width: $mobile-width) {
    padding-right: 1rem;
    padding-left: 3rem;
  }
}

.cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  perspective: 100vw;
  text-align: center;
  contain: style;
}
</style>
