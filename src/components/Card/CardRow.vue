<template>
  <div class="row card-row">
  <div class="col" v-for="item in items">
      <card
      :title="item.name"
      :content="item.description"
      :image="item.image"
      :url="item.url"
      :readmore="item.readmore"
      />
    </div>
  </div>
</template>

<script>
  import Card from '@/components/Card/Card';

  export default {
    name: 'card-row',
    components: {
      Card,
    },
    props: {
      items: {
        type: Array,
        require: true,
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/main";

  .card-row {
    flex-wrap: wrap;

    > .col {
      @include flex-item(100%);
      margin-bottom: 2rem;
      display: flex;

      @media (min-width: $mobile-width) {
        @include flex-item(50%);
      }

      @media (min-width: $desktop-width) {
        @include flex-item(percentage(1 / 3));
      }
    }
  }
</style>
