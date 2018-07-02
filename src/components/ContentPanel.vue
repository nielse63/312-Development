<template>
  <div class="content-panel" :class="wrapperClass">
    <!-- <header>
      <h2>Some Title</h2>
    </header> -->
    <div class="body">
      <!-- <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nostrum dignissimos quo alias. Libero suscipit error sequi aliquam consectetur et amet esse temporibus sunt? Dolore id quisquam facilis aperiam expedita aliquam.</p>
      <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolore perferendis aliquam quisquam commodi doloremque neque libero, laborum consequuntur, iusto nulla recusandae maiores. Aspernatur, ab explicabo? Sint quia quidem ab dignissimos.</p> -->
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name:  'ContentPanel',
  props: {
    narrow: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
  data() {
    return {
      inView:    false,
      offsetTop: 0,
    };
  },
  computed: {
    wrapperClass() {
      return {
        narrow:    this.narrow,
        'in-view': this.inView,
      };
    },
  },
  methods: {
    onscroll() {
      if (this.inView) {
        window.removeEventListener('scroll', this.onscroll);
        return;
      }
      const windowBottom = window.scrollY + window.innerHeight;
      if (windowBottom > this.offsetTop) {
        this.inView = true;
      }
    },
    setOffsetTop() {
      const { offsetTop, clientHeight } = this.$el;
      this.offsetTop = offsetTop + (clientHeight / 2);
    },
  },
  beforeMount() {
    window.addEventListener('scroll', this.onscroll, false);
  },
  mounted() {
    this.setOffsetTop();
    this.onscroll();
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.onscroll);
  },
};
</script>

<style scoped lang="scss">
@import "../assets/styles/lib/vars";

.content-panel {
  padding: $content-padding ($content-padding * 2);
  font-size: 18px;
  margin: 0 auto;

  &:nth-child(even) {
    text-align: right;
  }
}

.narrow {
  max-width: 80vw;
}

header {
  margin-bottom: 2rem;
  font-size: 1.25em;
}

.body {
  line-height: 2;
}

h2 {
  padding: 0 0.35em;
  transition: color 1s;
  transition-timing-function: cubic-bezier(0.2, 1, 0.3, 1);
  position: relative;
  display: inline-block;

  &:before {
    content: "";
    background: fade-out($color-pink, 0.15);
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50%;
    opacity: 0.3;
    transform: scale3d(0, 1, 1);
    transform-origin: 0% 50%;
    transition: transform 1s;
    transition-timing-function: cubic-bezier(0.2, 1, 0.3, 1);
  }
}

.in-view {
  h2 {
    color: $color-pink;

    &:before {
      transform: scale3d(1, 1, 1);
      background: $color-pink;
    }
  }
}
</style>
