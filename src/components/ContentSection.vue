<template>
  <div :class="cls" :id="id">
    <header>
      <h2 class="section-title" v-once v-in-view>{{title}}</h2>
    </header>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name:  'ContentSection',
  props: {
    title: {
      type: String,
    },
    id: {
      type: String,
      default() {
        return this.title.toLowerCase()
          .replace(/my/ig, '')
          .trim()
          .replace(/\s/g, '-');
      },
    },
  },
  computed: {
    cls() {
      const output = {
        'content-section': true,
      };
      output[this.id] = true;
      return output;
    },
  },
};
</script>

<style scoped lang="scss">
@import "../assets/styles/lib/mixins";
@import "../assets/styles/lib/vars";

.content-section {
  background-color: $color-white;
  position: relative;
  font-size: 20px;
  margin: 0 auto;
  perspective: 100vw;
  contain: style;

  @media (min-width: $desktop-width) {
    display: flex;
  }

  > * {
    position: relative;

    @media (min-width: $desktop-width) {
      flex: 1 0 50%;
    }
  }
}

header {
  padding: 7.5vh 10vw 0;

  @media (min-width: $desktop-width) {
    padding-bottom: 7.5vh;
  }
}

h2 {
  font-size: 10vw;
  font-family: $font-family-serif;
  font-weight: 400;
  text-shadow: 0.05em 0.05em 1em fade-out($color-black, 0.8);
  display: inline-block;
  background-color: $color-white;
  padding: 0 0.15em;
  line-height: 1;
  opacity: 0;
  transform: translate(0, 50px);
  transition: 0.35s ease-in-out 1s;
  transition-property: transform, opacity;
  // will-change: transform, opacity;

  @media (min-width: $mobile-width) {
    font-size: 8vw;
  }

  &[data-in-view="true"] {
    transition-delay: 0s;
    opacity: 1;
    transform: translate(0, 0);
  }
}

// span {
//   opacity: 0;
//   display: inline-block;
//   transform: translateY(50vh);
// }

article {
  color: $color-white;
  line-height: 2;
  padding: 7.5vh 10vw;
}

a {
  display: inline-block;
  line-height: 1.1;
  font-style: italic;
  font-family: $font-family-serif;
  position: relative;

  &:before {
    content: "";
    display: block;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 0.25em;
    background-color: fade-out($color-pink, 0.15);
    transition: 0.15s ease-in-out;
  }

  &:hover {
    &:before {
      height: 0.5em;
      background-color: fade-out($color-pink, 0.35);
    }
  }
}

.about-me {
  header {
    padding-right: 0;
    color: #852d91;
  }
}

.experience {
  header {
    padding-bottom: 0;
    color: #0096f3;
  }

  h2 {
    padding-bottom: 0.2em;
  }
}

.portfolio {
  header {
    padding-left: 2rem;
    color: #ba14bd;
    text-align: right;
  }
}

.skills-and-tools {
  header {
    padding-top: 5rem;
    padding-bottom: 0;
    color: #f9a449;
  }
}

.contact-me {
  header {
    padding-bottom: 2rem;
    color: #00945b;
  }
}
</style>
