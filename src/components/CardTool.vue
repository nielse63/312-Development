<template>
  <div class="card-tool" :style="style">
    <figure class="tool" v-html="image"></figure>
  </div>
</template>

<script>
export default {
  name:  'CardTool',
  props: {
    index: {
      type:     Number,
      required: true,
    },
    title: {
      type:     String,
      required: true,
    },
    image: {
      type:     String,
      required: true,
    },
  },
  computed: {
    style() {
      return {
        'transition-delay': `${this.index * 0.15}s`,
      };
    },
  },
};
</script>

<style scoped lang="scss">
@import "../assets/styles/lib/mixins";
@import "../assets/styles/lib/vars";

.card-tool {
  margin: 0;
  padding: 1rem;
  @include basic-content-transform;
}

.tool {
  display: block;
  width: 100px;
}
</style>
