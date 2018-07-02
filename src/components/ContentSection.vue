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
}
</style>
