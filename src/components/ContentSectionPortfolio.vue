<template>
  <content-section title="Selected Work" id="portfolio" @inview="inview">
    <article>
      <div class="cards">
        <template v-for="(card, i) in cards">
          <card-portfolio
            :key="i"
            :inview="isInView"
            :title="card.title"
            :image="card.image"
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
          title: 'Project Name',
          image: MountainImage,
        },
        {
          title: 'Project Name',
          image: RoadImage,
        },
        {
          title: 'Project Name',
          image: PoolImage,
        },
        {
          title: 'Project Name',
          image: PlaceholderImage,
        },
        {
          title: 'Project Name',
          image: MountainImage,
        },
        {
          title: 'Project Name',
          image: RoadImage,
        },
      ],
    };
  },
  methods: {
    inview() {
      this.isInView = true;
    },
  },
};
</script>

<style scoped lang="scss">
@import "../assets/styles/lib/mixins";
@import "../assets/styles/lib/vars";

.content-section {
  flex-direction: row-reverse;
  align-items: center;

  &:before {
    content: "";
    @include size(100%);
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    background-image: $gradient-pink;
    clip-path: polygon(0 0, 31% 0, 71% 100%, 0 100%);
  }
}

article {
  padding-right: 1rem;
  padding-left: 3rem;
}

.cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  perspective: 100vw;
}
</style>
