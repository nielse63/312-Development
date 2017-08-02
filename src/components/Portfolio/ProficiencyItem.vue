<template>
  <div class="item">
    <template v-if="!isSVG">
      <img v-if="image"
        :data-lazy-load="src"
        :alt="name"
      >
    </template>
    <template v-else>
      <div class="item__svg" v-html="src"></div>
    </template>
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
        type: [Object, String],
      },
    },
    computed: {
      isSVG() {
        if ({}.toString.call(this.image) === '[object Object]' && this.image.template) {
          return true;
        }
        return false;
      },
      src() {
        if (this.isSVG) {
          return this.image.template;
        }
        return this.image;
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
