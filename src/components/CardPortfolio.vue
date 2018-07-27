<template>
  <div :class="cls">
    <div class="layer"></div>
    <div class="layer"></div>
    <div class="layer"></div>
    <figure :style="style">
      <h3>{{title}}</h3>
    </figure>
  </div>
</template>

<script>
export default {
  name:  'CardPortfolio',
  props: {
    inview: {
      type:    Boolean,
      default: false,
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
    cls() {
      return {
        'card-portfolio': true,
        inview:           this.inview,
      };
    },
    style() {
      return {
        backgroundImage: `url(${this.image})`,
      };
    },
  },
};
</script>

<style scoped lang="scss">
/* stylelint-disable no-descending-specificity */
@import "../assets/styles/lib/mixins";
@import "../assets/styles/lib/vars";

.card-portfolio {
  flex: 1 0 50%;
  max-width: 50%;
  padding: 0.5rem;
  position: relative;
  transition: 0.5s $transition-timing-function;
  transition-property: opacity, transform;

  &:not(.inview) {
    opacity: 0;

    &:first-child {
      transform: translate((random(5) - 30) + px, (random(5) - 30) + px);
    }

    &:nth-child(2) {
      transform: translate((random(5) + 25) + px, (random(5) - 30) + px);
    }

    &:nth-child(3) {
      transform: translate((random(5) - 30) + px, 0);
    }

    &:nth-child(4) {
      transform: translate((random(5) + 25) + px, 0);
    }

    &:nth-child(5) {
      transform: translate((random(5) - 30) + px, (random(5) + 25) + px);
    }

    &:nth-child(6) {
      transform: translate((random(5) + 25) + px, (random(5) + 25) + px);
    }
  }

  &:hover {
    figure {
      transform: translate3d(-2px, 4px, 30px) rotate(2deg);
    }

    .layer {
      &:first-child {
        transform: translate3d(4px, 5px, 25px) rotate(-2deg);
      }

      &:nth-child(2) {
        transform: translate3d(-3px, 10px, 15px) rotate(5deg);
      }

      &:nth-child(3) {
        transform: translate3d(4px, -3px, 5px) rotate(-2deg);
      }
    }
  }
}

figure {
  background-position: center;
  background-size: cover;
  position: relative;
  margin: 0;
  height: 35vh;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 10px solid currentColor;
  border-radius: 3px;
  box-shadow: 0 3px 1rem fade-out($color-black, 0.65);
  cursor: pointer;
  transition: 0.25s transform ease-in-out;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    @include size(100%);
    background-image: linear-gradient(to bottom, rgba(245, 239, 40, 0.3), rgba(164, 22, 169, 0.6));
  }
}

h3 {
  font-size: 20px;
  line-height: 1;
  text-transform: uppercase;
  letter-spacing: 3px;
  position: relative;
}

.layer {
  opacity: 0.4;
  position: absolute;
  top: 10px;
  left: 10px;
  bottom: 10px;
  right: 10px;
  transition: 0.25s transform ease-in-out;

  &:first-child {
    background-color: #ac5cf5;
  }

  &:nth-child(2) {
    background-color: #5db4eb;
  }

  &:nth-child(3) {
    background-color: #5debb4;
  }
}
</style>
