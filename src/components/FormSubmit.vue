<template>
  <div :class="cls">
    <button
      :disabled="loading"
      :aria-disabled="loading"
    ><span>Submit</span></button>
    <svg class="progress-circle" width="70" height="70">
      <path d="m35,2.5c17.955803,0 32.5,14.544199 32.5,32.5c0,17.955803 -14.544197,32.5 -32.5,32.5c-17.955803,0 -32.5,-14.544197 -32.5,-32.5c0,-17.955801 14.544197,-32.5 32.5,-32.5z"/>
    </svg>
    <svg class="checkmark" width="70" height="70">
      <path d="m31.5,46.5l15.3,-23.2"/><path d="m31.5,46.5l-8.5,-7.1"/>
    </svg>
    <svg class="cross" width="70" height="70">
      <path d="m35,35l-9.3,-9.3"/>
      <path d="m35,35l9.3,9.3"/>
      <path d="m35,35l-9.3,9.3"/>
      <path d="m35,35l9.3,-9.3"/>
    </svg>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'FormSubmit',
  data() {
    return {
      loading: false,
      success: false,
      error:   false,
      svgs:    {
        progress: {
          paths:   [],
          lengths: [],
        },
        checkmark: {
          paths:   [],
          lengths: [],
        },
        cross: {
          paths:   [],
          lengths: [],
        },
      },
    };
  },
  computed: {
    cls() {
      return {
        'form-submit': true,
        loading:       this.loading,
        success:       this.success,
        error:         this.error,
      };
    },
  },
  methods: {
    ...mapActions('message', ['reset']),
    onsubmit() {
      this.loading = true;
      this.success = false;
      this.error = false;
    },
    oncomplete(success = true) {
      this.loading = false;
      this.success = success;
      this.error = !success;
      this.$nextTick(() => {
        this.reset();
      });
    },
    createSVGObject(object, selector) {
      const svg = this.$el.querySelector(selector);
      const paths = [...svg.querySelectorAll('path')];
      const lengths = paths.map(path => path.getTotalLength());
      return { ...object, paths, lengths };
    },
    setData() {
      const progress = this.createSVGObject(this.svgs.progress, '.progress-circle');
      const checkmark = this.createSVGObject(this.svgs.checkmark, '.checkmark');
      const cross = this.createSVGObject(this.svgs.cross, '.cross');
      this.svgs = {
        ...this.svgs, progress, checkmark, cross,
      };
    },
    draw(svgObject, value) {
      const { paths, lengths } = svgObject;
      const percentage = value > 1 ? value / 100 : value;
      paths.forEach((path, i) => {
        // eslint-disable-next-line no-param-reassign
        path.style.strokeDashoffset = lengths[i] * (1 - percentage);
      });
    },
    resetPaths(svgObject) {
      const { paths, lengths } = svgObject;
      paths.forEach((path, i) => {
        // eslint-disable-next-line no-param-reassign
        path.style.strokeDasharray = lengths[i];
      });
      this.draw(svgObject, 0);
    },
    init() {
      this.setData();
      [
        this.svgs.progress,
        this.svgs.checkmark,
        this.svgs.cross,
      ].forEach(this.resetPaths);
    },
  },
  beforeDestroy() {
    this.$dispatcher.$off('submitting', this.onsubmit);
    this.$dispatcher.$off('complete', this.oncomplete);
  },
  beforeMount() {
    this.$dispatcher.$once('submitting', this.onsubmit);
    this.$dispatcher.$once('complete', this.oncomplete);
  },
  mounted() {
    this.init();
  },
};
</script>

<style scoped lang="scss">
@import "../assets/styles/lib/vars";

$color: $color-green-dark;

.form-submit {
  position: relative;
  margin: 2rem 0 0;
  width: 250px;
}

button {
  display: block;
  padding: 0;
  margin: 0 auto;
  width: 250px;
  height: 70px;
  border: 2px solid $color;
  border-radius: 40px;
  background: $color-white;
  color: $color;
  letter-spacing: 1px;
  font-size: 18px;
  -webkit-tap-highlight-color: transparent;
  transition: background-color 0.3s, color 0.3s, width 0.3s, border-width 0.3s, border-color 0.3s;

  .loading & {
    width: 70px;
    border-width: 5px;
    border-color: #ddd;
    background-color: transparent;
    color: #fff;
  }

  .error & {
    border-color: #fb797e;
    background-color: #fb797e;
  }

  .success & {
    border-color: $color;
    background-color: $color;
  }
}

span {
  transition: opacity 0.3s 0.1s;
  color: #006640;

  .loading &,
  .success &,
  .error & {
    opacity: 0;
  }
}

svg {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  pointer-events: none;
}

path {
  opacity: 0;
  fill: none;

  .progress-circle & {
    stroke: $color;
    stroke-width: 5;
  }

  .checkmark &,
  .cross & {
    stroke: #fff;
    stroke-linecap: round;
    stroke-width: 4;
    transition: opacity 0.1s;
  }
}

.loading {
  .progress-circle {
    path {
      opacity: 1;
      transition: 0.9s stroke-dashoffset 0.3s;
      stroke-dashoffset: 0 !important;
    }
  }
}

.success {
  .checkmark {
    path {
      opacity: 1;
      transition: stroke-dashoffset 0.3s 0.3s;
      stroke-dashoffset: 0 !important;
    }
  }
}

.error {
  .cross {
    path {
      opacity: 1;
      transition: stroke-dashoffset 0.3s 0.3s;
      stroke-dashoffset: 0 !important;
    }
  }
}
</style>
