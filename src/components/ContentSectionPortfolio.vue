<template>
  <content-section title="Selected Work" id="portfolio">
    <article>
      <div class="cards">
        <template v-for="(card, i) in cards">
          <card-portfolio
            :key="i"
            :index="i"
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
      cards: [
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
    background-image: linear-gradient(#de6cff, #bc41df);
    clip-path: polygon(0% 0%, 40% 0%, 71% 100%, 0% 100%);
    transition: $content-section-transition;
  }
}

.visible {
  &:before {
    clip-path: polygon(0% 0%, 47% 0%, 60% 100%, 0% 100%);
  }
}

article {
  padding-right: 1rem;
}

.cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
