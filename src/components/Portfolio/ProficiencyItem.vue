<template>
  <div class="proficiency-item" v-html="image"></div>
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

<style lang="scss" scoped>
  @import '../../assets/styles/main';

  .proficiency-item {
    text-align: center;
    max-height: 155px;
    max-width: 100px;
  }
</style>
