<template>
  <div class="floating-box">
    <figure>
      <template v-if="href[0] == '/'">
        <router-link :to="href">
          <figcaption>
            <h3>{{title}}</h3>
            <p v-if="text">{{text}}</p>
          </figcaption>
        </router-link>
      </template>
      <template v-else>
        <a :href="href">
          <figcaption>
            <h3>{{title}}</h3>
            <p v-if="text">{{text}}</p>
            <slot></slot>
          </figcaption>
        </a>
      </template>
    </figure>
  </div>
</template>

<script>
import preload from '@/lib/preload';

// const randomNumber = (max = 100) => Math.floor(Math.random() * max) - (max / 2);

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
  // data() {
  //   return {
  //     middle: 0,
  //     style:  {
  //       transform:       'translate(0, 0)',
  //       transitionDelay: '0s',
  //       opacity:         0,
  //     },
  //   };
  // },
  // methods: {
  //   getTop() {
  //     let yPosition = 0;
  //     let element = this.$el;
  //     while (element) {
  //       yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
  //       element = element.offsetParent;
  //     }
  //     return yPosition;
  //   },
  //   onscroll() {
  //     const screenBottom = window.scrollY + window.innerHeight;
  //     if (this.middle < screenBottom) {
  //       this.style = {
  //         ...this.style,
  //         transform: 'translate(0, 0)',
  //         opacity:   1,
  //       };
  //       window.removeEventListener('scroll', this.onscroll, false);
  //     }
  //   },
  // },
  // beforeMount() {
  //   const translate = Math.floor(Math.random() * 50) + 100;
  //   const transitionDelay = Math.random() / 2;
  //   this.style = {
  //     ...this.style,
  //     transform:       `translate(0, ${translate}px)`,
  //     transitionDelay: `${transitionDelay}s`,
  //   };
  // },
  mounted() {
    // this.middle = this.getTop() + (this.$el.clientHeight / 2);
    this.$nextTick()
      .then(() => {
        preload(this.image);
      })
      .then(() => {
        this.$el.querySelector('a').style.backgroundImage = `url(${this.image})`;
      });
    // .then(() => {
    //   window.addEventListener('scroll', this.onscroll, false);
    //   this.onscroll();
    // });
  },
  // beforeDestroy() {
  //   window.removeEventListener('scroll', this.onscroll, false);
  // },
};
</script>

<style scoped lang="scss">
@import "../assets/styles/lib/vars";
@import "../assets/styles/lib/mixins";

.floating-box {
  @include size(calc(50% - 2em), 350px);
  margin: 2em 0;
}

figure {
  margin: 0;
  max-height: 100%;
  overflow: hidden;
  position: relative;
  box-shadow: 0 10px 25px fade-out($color-black, 0.75);
  will-change: opacity, transform;
  transition: 0.5s transform ease-in-out,
              0.25s opacity ease-in-out;
}

figcaption {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1.5em;
  color: $color-white;
}

a {
  display: block;
  height: 350px;
  position: relative;
  background-size: cover;
  background-position: top center;

  &:before {
    content: "";
    display: block;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(to bottom, transparent 0%, $color-black 100%);
    height: 50%;
    transition: 0.5s height ease-in-out;
    will-change: height;
  }

  &:hover {
    &:before {
      height: 70%;
    }
  }
}

h3 {
  line-height: 1;
  margin: 0;

  + * {
    margin-top: 1em;
  }
}

p {
  line-height: 1;
}
</style>
