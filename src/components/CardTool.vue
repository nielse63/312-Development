<template>
  <!-- <div class="card-tool" :style="style"> -->
  <div class="card-tool">
    <figure class="tool" v-html="image"></figure>
  </div>
</template>

<script>
export default {
  name:  'CardTool',
  props: {
    title: {
      type:     String,
      required: true,
    },
    image: {
      type:     String,
      required: true,
    },
  },
  // computed: {
  //   style() {
  //     const y = Math.floor(Math.random() * 500);
  //     return {
  //       transform: `translate(0, ${y}px)`,
  //     };
  //   },
  // },
};
</script>

<style scoped lang="scss">
@import "../assets/styles/lib/vars";

.tool {
  position: relative;
  display: block;
  width: $tool-icon-size;
  height: $tool-icon-size;
  margin: 0;
  padding: 0.5rem;
  background-color: $color-white;
  border-radius: 50%;
  box-shadow: 0 3px 1rem fade-out($color-black, 0.65);
  transition: 0.25s transform ease-in-out;
}

.card-tool {
  padding: 1rem;
  transform: translateY(500px);
  opacity: 0;

  &:hover {
    .tool {
      transform: scale(2);
      z-index: 1;
    }
  }
}
</style>
