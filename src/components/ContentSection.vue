<template>
  <article class="content-section">
    <slot></slot>
  </article>
</template>

<script>
export default {
  name: 'ContentSection',
};
</script>

<style scoped lang="scss">
@import "../assets/styles/lib/vars";

.content-section {
  background-color: $color-white;
  position: relative;
  padding-top: 5rem;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 25vh;
    background: linear-gradient(to bottom, #000, transparent);
  }
}
</style>
