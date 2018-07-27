<template>
  <div :class="cls" :id="id">
    <header>
      <h2 class="section-title" v-html="titleHTML"></h2>
    </header>
    <slot></slot>
  </div>
</template>

<script>
import anime from 'animejs';

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
    titleHTML() {
      return this.title
        .split('')
        .map(letter => (letter === ' ' ? '&nbsp;' : letter))
        .map((letter) => {
          const transform = Math.floor(Math.random() * 50) + 25;
          const css = `transform: translateY(${transform}vh);`;
          return `<span style="${css}">${letter}</span>`;
        })
        .join('');
    },
  },
  methods: {
    animateTitle() {
      const targets = this.$el.querySelectorAll('h2 span');
      return anime({
        targets,
        opacity:    1,
        translateY: 0,
        duration:   1000,
        easing:     'easeOutElastic',
        delay(target, index) {
          return index * 25;
        },
        elasticity() {
          return anime.random(100, 150);
        },
      });
    },
    isInView() {
      this.animateTitle();
    },
    setObserver() {
      const options = {
        root:       null,
        rootMargin: '0px',
        threshold:  [],
      };
      for (let i = 0; i <= 1; i += 0.1) {
        options.threshold.push(i);
      }
      const observer = new IntersectionObserver((entries) => {
        const entry = entries[0];
        if (!entry.isIntersecting) {
          return;
        }
        if (entry.intersectionRect.height / window.innerHeight >= 0.75) {
          observer.unobserve(entry.target);
          this.$emit('inview');
        }
      }, options);
      observer.observe(this.$el);
    },
  },
  created() {
    this.$once('inview', this.isInView);
  },
  mounted() {
    this.setObserver();
  },
};
</script>

<style scoped lang="scss">
@import "../assets/styles/lib/mixins";
@import "../assets/styles/lib/vars";

.content-section {
  display: flex;
  background-color: $color-white;
  position: relative;
  font-size: 20px;
  margin: 0 auto;
  perspective: 100vw;
  contain: content;

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
  text-shadow: 0.05em 0.05em 1em fade-out($color-black, 0.8);
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

  h2 {
    background-color: $color-white;
  }
}

.experience {
  display: block;

  header {
    padding-bottom: 0;
    color: #0096f3;
  }

  h2 {
    display: inline-block;
    padding: 0 0.15em 0.1em;
    background-color: $color-white;
  }
}

.portfolio {
  header {
    padding-left: 2rem;
    color: #ba14bd;
  }
}

.skills-and-tools {
  header {
    padding-top: 5rem;
    padding-bottom: 0;
  }

  h2 {
    display: inline-block;
    color: #f9a449;
    padding: 0 0.15em;
    background-color: $color-white;
  }
}

.contact-me {
  header {
    padding-bottom: 2rem;
    color: #00945b;
  }
}
</style>
