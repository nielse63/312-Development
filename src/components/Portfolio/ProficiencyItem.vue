<template>
  <div class="item">
    <div class="item__svg" v-html="image"></div>
  </div>
</template>

<script>
  export default {
    name: 'proficiencies-item',
    props: {
      name: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        default: '',
      },
    },
  };
</script>

<style lang="scss">
  .item {
    svg {
      max-width: 100px;
      max-height: 155px;
    }
  }
</style>

<style lang="scss" scoped>
  @import "../../assets/styles/main";

  .item {
    text-align: center;
  }

  .item,
  img {
    max-height: 155px;
  }
</style>
