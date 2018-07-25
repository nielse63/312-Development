<template>
  <div :class="cls" :id="id">
    <header>
      <h2 :data-title="title">{{title}}</h2>
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
  data() {
    return {
      visible: false,
    };
  },
  computed: {
    cls() {
      const output = {
        visible:           this.visible,
        'content-section': true,
      };
      output[this.id] = true;
      return output;
    },
  },
  methods: {
    shouldBeVisible() {
      const { offsetTop, offsetHeight } = this.$el;
      const { scrollY } = window;
      const offsetBottom = offsetTop + offsetHeight;
      // if (this.title === 'Selected Work') {
      //   console.log({
      //     offsetTop,
      //     scrollY,
      //     offsetBottom,
      //     title:  this.title,
      //     truthy: offsetTop < scrollY && scrollY < offsetBottom,
      //   });
      // }
      return offsetTop < scrollY && scrollY < offsetBottom;
    },
  },
  mounted() {
    let y = -1;
    const kickoff = () => {
      if (window.scrollY !== y) {
        this.visible = this.shouldBeVisible();
      }
      y = window.scrollY;
      window.requestAnimationFrame(kickoff);
    };
    kickoff();
  },
};
</script>

<style scoped lang="scss">
@import "../assets/styles/lib/vars";

.content-section {
  display: flex;
  background-color: $color-white;
  position: relative;
  font-size: 20px;
  margin: 0 auto;

  > * {
    flex: 1 0 50%;
    position: relative;
  }
}

header,
article {
  padding: ($content-padding * 0.75) $content-padding;
}

h2 {
  font-family: $font-family-serif;
  font-weight: 400;
  font-size: 8vw;
  opacity: 0;
  transform: translate(0, 25px);
  transition: $content-section-transition;
  transition-delay: 0.5s;

  .visible & {
    opacity: 1;
    transform: translate(0, 0);
    transition-delay: 0s;
  }
}

article {
  color: $color-white;
  line-height: 2;
}

a {
  display: inline-block;
  line-height: 1.1;
  font-style: italic;
  font-family: $font-family-serif;
  transition: 0.15s background-color ease-in-out;
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
    will-change: height, background-color;
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
  display: block;

  header {
    padding-bottom: 0;
  }
}

.portfolio {
  header {
    padding-left: 2rem;
    color: #b914eb;
  }
}

.skills-and-tools {
  header {
    padding-bottom: 0;
    margin-bottom: -1.25em;
    color: #fec163;
  }
}

.contact-me {
  header {
    padding-bottom: 2rem;
    color: #00945b;
  }
}
</style>
