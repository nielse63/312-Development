<template>
  <div :class="cls" :style="style">
    <div class="inner">
      <h3>{{value}}</h3>
      <p>{{description}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name:  'ExperienceBox',
  props: {
    inview: {
      type:    Boolean,
      default: false,
    },
    header: {
      type:     [String, Number],
      required: true,
    },
    description: {
      type:     String,
      required: true,
    },
  },
  computed: {
    value() {
      return new Intl.NumberFormat('en-US').format(Number(this.header));
    },
    cls() {
      return {
        box:    true,
        inview: this.inview,
        small:  this.value.length > 5,
      };
    },
    style() {
      return {
        'transition-delay': `${Math.random() / 2}s`,
      };
    },
  },
};
</script>

<style scoped lang="scss">
@import "../assets/styles/lib/mixins";
@import "../assets/styles/lib/vars";

.box {
  flex: 1 0 100%;
  padding: 2vh 1vw;
  text-shadow: 0.05em 0.05em 1em fade-out($color-black, 0.65);
  transform: translateZ(-10vw);
  opacity: 0;
  transition: 0.5s $transition-timing-function;
  transition-property: opacity, transform;
  will-change: opacity, transform;

  @media (min-width: $mobile-width) {
    flex: 1 0 percentage(1 / 3);
    max-width: percentage(1 / 3);
  }
}

.inner {
  background-image: linear-gradient(to bottom, rgba(205, 81, 220, 0.4), rgba(41, 94, 230, 0.3));
  height: 100%;
  padding: 1.5rem 1rem;
  box-shadow: 0 3px 1rem fade-out($color-black, 0.65);
  border: 10px solid $color-white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.inview {
  opacity: 1;
  transform: translateZ(0);
}

h3 {
  font-size: 6vw;
  font-weight: 400;
  margin: 0;

  .small & {
    font-size: 5vw;
  }
}

p {
  font-weight: 700;
  letter-spacing: 1px;
  margin-top: 0.5em;
}
</style>
