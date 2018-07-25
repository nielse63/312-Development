<template>
  <div class="card-portfolio">
    <figure :style="style">
      <h3>{{title}}</h3>
    </figure>
  </div>
</template>

<script>
export default {
  name:  'CardPortfolio',
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
        backgroundImage:    `url(${this.image})`,
        'transition-delay': `${this.index * 0.15}s`,
      };
    },
  },
};
</script>

<style scoped lang="scss">
@import "../assets/styles/lib/mixins";
@import "../assets/styles/lib/vars";

.card-portfolio {
  flex: 1 0 50%;
  max-width: 50%;
  padding: 0.5rem;
}

figure {
  background-position: center;
  background-size: cover;
  margin: 0;
  height: 35vh;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 10px solid currentColor;
  border-radius: 3px;
  box-shadow: 0 3px 1rem fade-out($color-black, 0.65);
  @include basic-content-transform;
}

h3 {
  font-size: 20px;
  line-height: 1;
  text-transform: uppercase;
  letter-spacing: 3px;
}
</style>
