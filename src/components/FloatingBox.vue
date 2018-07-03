<template>
  <div class="floating-box" :style="style">
    <figure :style="figureStyle">
      <a :href="href">
        <figcaption>
          <h3>{{title}}</h3>
          <p v-if="text">{{text}}</p>
        </figcaption>
      </a>
    </figure>
  </div>
</template>

<script>
const maxOffset = 65;
const randomNumber = () => Math.floor(Math.random() * maxOffset) - (maxOffset / 2);

export default {
  name:  'FloatingBox',
  props: {
    index: {
      type: Number,
    },
    title: {
      type: String,
    },
    text: {
      type: String,
    },
    href: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  data() {
    return {
      top:  randomNumber(),
      left: randomNumber() * 2,
    };
  },
  computed: {
    style() {
      const left = this.index % 2 === 0 ? -Math.abs(this.left) : Math.abs(this.left);
      return {
        transform: `translate(${left}px, ${this.top}px)`,
      };
    },
    figureStyle() {
      return {
        backgroundImage: `url(${this.image})`,
      };
    },
  },
};
</script>

<style scoped lang="scss">
@import "../assets/styles/lib/vars";
@import "../assets/styles/lib/mixins";

.floating-box {
  @include size(calc(50% - 2em), 350px);
  box-shadow: 0 10px 25px fade-out($color-black, 0.75);
  margin: 2em 0;
}

figure {
  margin: 0;
  max-height: 100%;
  overflow: hidden;
  position: relative;
  background-size: cover;
  background-position: top center;
}

figcaption {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1em;
  color: $color-white;
}

a {
  display: block;
  height: 350px;
  position: relative;

  &:before {
    content: "";
    display: block;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(to bottom, transparent 0%, $color-black 100%);
    height: 35%;
    transition: 0.5s height ease-in-out;
    will-change: height;
  }

  &:hover {
    &:before {
      height: 50%;
    }
  }
}

h3 {
  line-height: 1;
  margin: 0;
}

p {
  margin: 0;
}
</style>
