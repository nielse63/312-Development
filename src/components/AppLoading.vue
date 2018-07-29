<template>
  <div class="app-loading">
    <div class="loading">
      <div v-html="svg"></div>
      <p>{{text}}</p>
    </div>
  </div>
</template>

<script>
import LoadingSVG from '@/assets/images/loading.svg';

export default {
  name: 'AppLoading',
  data() {
    return {
      svg:      LoadingSVG,
      dotcount: 0,
      basetext: 'Loading',
      interval: null,
    };
  },
  computed: {
    text() {
      const dots = '.'.repeat(this.dotcount);
      return `${this.basetext}${dots}`;
    },
  },
  methods: {
    updateText() {
      this.interval = setInterval(() => {
        if (this.dotcount === 3) {
          this.dotcount = 0;
          return;
        }
        this.dotcount += 1;
      }, 350);
    },
  },
  mounted() {
    this.updateText();
  },
};
</script>

<style scoped lang="scss">
@import "../assets/styles/lib/vars";

.app-loading {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-image: linear-gradient(to bottom, fade-out($color-purple-light, 0.5), fade-out($color-purple-dark, 0.5));
  z-index: 999;
  color: $color-white;
}

.loading {
  position: sticky;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: inline-block;
  text-align: center;
  padding-bottom: 2rem;
}

p {
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  position: absolute;
  bottom: 0;
  left: 0;
}
</style>
