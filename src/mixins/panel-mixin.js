
export default {
  data() {
    return {
      dir:     'left',
      top:     0,
      lastY:   -1,
      inView:  false,
      ticking: false,
    };
  },
  computed: {
    classObject() {
      const { inView, dir } = this;
      const output = {
        'panel--slide': true,
        'in-view':      inView,
      };
      if (dir) {
        output[dir] = !!dir;
      }
      return output;
    },
  },
  methods: {
    setTop() {
      const { offsetTop } = this.$el;
      const halfWindowHeight = window.innerHeight / 2;
      const difference = halfWindowHeight > 250 ? 250 : halfWindowHeight;
      this.top = offsetTop + difference;
    },
    onready() {
      this.setTop();
      window.requestAnimationFrame(this.onscroll);
    },
    onscroll() {
      const {
        inView, ticking, lastY, top,
      } = this;
      if (inView || ticking) { return; }
      this.ticking = true;
      const scrollBottom = window.scrollY + window.innerHeight;
      if (lastY !== scrollBottom && top < scrollBottom) {
        this.inView = true;
      } else {
        this.lastY = scrollBottom;
        this.ticking = false;
        window.requestAnimationFrame(this.onscroll);
      }
    },
  },
  mounted() {
    if (document.readyState === 'complete') {
      this.onready();
    } else {
      document.addEventListener('readystatechange', ({ target }) => {
        if (target.readyState === 'complete') { this.onready(); }
      });
    }
  },
};
