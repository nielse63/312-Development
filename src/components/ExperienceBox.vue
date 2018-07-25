<template>
  <div class="box" :style="style">
    <h3>{{header}}</h3>
    <p>{{description}}</p>
  </div>
</template>

<script>
export default {
  name:  'ExperienceBox',
  props: {
    index: {
      type:     Number,
      required: true,
    },
    header: {
      type:     String,
      required: true,
    },
    description: {
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

.box {
  flex: 1 0 25%;
  max-width: 25%;
  padding: 2rem;
  @include basic-content-transform;

  &:nth-child(4) {
    ~ * {
      margin-top: 3rem;
      border-top: 1px solid currentColor;
      padding-top: 4rem;
    }
  }
}

h3 {
  font-size: 7vw;
  font-weight: 400;
  margin: 0;
}

p {
  font-weight: 700;
  letter-spacing: 1px;
  margin-top: 0.5em;
}
</style>
