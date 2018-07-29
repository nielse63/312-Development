<template>
  <div :class="cls">
    <!-- <div class="layer"></div>
    <div class="layer"></div>
    <div class="layer"></div> -->
    <figure :style="style">
      <external-link :href="url">
        <h3>{{title}}</h3>
      </external-link>
    </figure>
  </div>
</template>

<script>
import ExternalLink from '@/components/ExternalLink';

export default {
  name:       'CardPortfolio',
  components: {
    ExternalLink,
  },
  props: {
    inview: {
      type:    Boolean,
      default: false,
    },
    title: {
      type:     String,
      default:  '',
      required: true,
    },
    image: {
      type:     String,
      default:  '',
      required: true,
    },
    url: {
      type:     String,
      default:  '',
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
  flex: 1 0 100%;
  padding: 0.5rem;
  position: relative;
  transition: 0.5s $transition-timing-function;
  transition-property: opacity, transform;
  transform: translateZ(-10vw);
  opacity: 0;
  perspective: 100vw;

  @media (min-width: $mobile-width) {
    flex: 1 0 50%;
    max-width: 50%;
  }

  &:hover {
    transform: translateZ(2vw);

    figure {
      box-shadow: 0 6px 2rem fade-out($color-black, 0.5);
    }

    h3 {
      transform: translateZ(5vw);
      text-shadow: 0 0.5em 1em fade-out($color-black, 0.5);
    }
  }
}

.inview {
  opacity: 1;
  transform: translateZ(0);
}

figure {
  background-position: center;
  background-size: cover;
  position: relative;
  margin: 0;
  border: 10px solid currentColor;
  border-radius: 3px;
  box-shadow: 0 3px 1rem fade-out($color-black, 0.65);
  cursor: pointer;
  transition: 0.25s ease-in-out;

  &:before,
  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    @include size(100%);
    background-image: linear-gradient(to bottom, rgba(245, 239, 40, 0.3), rgba(164, 22, 169, 0.6));
  }

  &:after {
    background-image: linear-gradient(to bottom, transparent, fade-out($color-black, 0.5));
  }
}

a {
  height: 35vh;
  max-height: 200px;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

h3 {
  font-size: 20px;
  line-height: 1;
  position: relative;
  z-index: 1;
  transition: 0.5s $transition-timing-function;
}
</style>
