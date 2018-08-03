<template>
  <div class="card-tool" v-in-view>
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
  transform: translateZ(-10vw);
  opacity: 0;
  transition: 0.5s $transition-timing-function;
  transition-property: opacity, transform;

  &[data-in-view="true"] {
    transform: translateZ(0);
    opacity: 1;
  }

  &:hover {
    .tool {
      transform: scale(1.5);
      z-index: 1;
    }
  }
}
</style>
