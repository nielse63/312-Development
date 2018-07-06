<template>
  <div class="portfolio-item">
    <div class="canvas-wrapper">
      <canvas></canvas>
    </div>
    <div class="content-wrapper">
      <h2>{{name}}</h2>
      <p class="description">{{description}}</p>
      <p>
        <span class="icon" v-html="images.link"></span>
        <external-link :href="url" :title="linkTitle">Visit Repo</external-link>
      </p>
      <p><span class="icon" v-html="images.star"></span>{{stargazers}}</p>
      <p><span class="icon" v-html="images.eye"></span>{{watchers}}</p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import colors from '@/lib/colors';
import ExternalLink from '@/components/ExternalLink';
import LinkImage from '@/assets/images/external-link.svg';
import EyeImage from '@/assets/images/eye.svg';
import StarImage from '@/assets/images/star.svg';

export default {
  name:       'PortfolioItem',
  components: {
    ExternalLink,
  },
  props: {
    // main
    name:        String,
    fullname:    String,
    description: String,
    language:    String,

    // urls
    homepage: String,
    url:      String,

    // dates
    created: String,
    pushed:  String,
    updated: String,

    // numbers
    stargazers: Number,
    watchers:   Number,
  },
  data() {
    return {
      canvas:    null,
      chart:     null,
      stats:     null,
      commits:   null,
      deletions: null,
      additions: null,
      labels:    null,
      images:    {
        link: LinkImage,
        eye:  EyeImage,
        star: StarImage,
      },
    };
  },
  computed: {
    ...mapGetters('portfolio', ['statsForRepo']),
    linkTitle() {
      return `View ${this.name} on GitHub`;
    },
  },
  methods: {
    ...mapActions('portfolio', ['fetchGitHubStatsForRepo']),
    setStats() {
      this.stats = this.statsForRepo(this.name);
      this.labels = Object.keys(this.stats);
      const values = Object.values(this.stats);
      this.commits = values.map(({ c }) => c);
      this.deletions = values.map(({ d }) => d);
      this.additions = values.map(({ a }) => a);
    },
    createGraph(Chart) {
      const chartData = {
        labels:   this.labels,
        datasets: [{
          type:        'line',
          label:       'Commits',
          borderColor: colors.blue,
          borderWidth: 2,
          fill:        false,
          data:        this.commits,
          yAxisID:     'y-axis-1',
        }, {
          type:            'bar',
          label:           'Git Deletions',
          backgroundColor: colors.red,
          data:            this.deletions,
          borderColor:     'white',
          borderWidth:     2,
          yAxisID:         'y-axis-2',
        }, {
          type:            'bar',
          label:           'Git Additions',
          backgroundColor: colors.green,
          data:            this.additions,
          yAxisID:         'y-axis-2',
        }],
      };
      const ctx = this.canvas.getContext('2d');
      ctx.height = this.canvas.clientHeight;
      this.chart = new Chart(ctx, {
        type:    'bar',
        data:    chartData,
        options: {
          responsive:          true,
          maintainAspectRatio: false,
          title:               {
            display: false,
          },
          tooltips: {
            mode:      'index',
            intersect: true,
          },
          scales: {
            xAxes: [{
              display: false,
            }],
            yAxes: [{
              display: false,
              id:      'y-axis-1',
            }, {
              display: false,
              id:      'y-axis-2',
            }],
          },
          layout: {
            padding: {
              top:    25,
              bottom: 25,
            },
          },
        },
      });
    },
  },
  mounted() {
    this.canvas = this.$el.querySelector('canvas');
    this.$nextTick()
      .then(() => this.fetchGitHubStatsForRepo(this.name))
      .then(() => this.setStats())
      .then(() => import(/* webpackChunkName: "chart-js" */ 'chart.js'))
      .then(({ Chart }) => {
        this.createGraph(Chart);
      });
  },
  beforeDestroy() {
    if (this.chart && this.chart.destroy) {
      this.chart.destroy();
    }
  },
};
</script>

<style scoped lang="scss">
@import "../assets/styles/lib/vars";
@import "../assets/styles/lib/mixins";

@mixin seperator {
  position: relative;
  padding-bottom: 0.5em;

  &:after {
    content: "";
    position: absolute;
    left: 50%;
    width: 50%;
    height: 1px;
    bottom: 0;
    background-color: $color-black;
    transform: translate(-50%, 0);
  }
}

.portfolio-item {
  height: 350px;
  box-shadow: 0 10px 25px fade-out($color-black, 0.75);
  position: relative;

  & + & {
    margin-top: 5rem;
  }
}

.content-wrapper {
  @include size(35%, 100%);
  position: absolute;
  top: 0;
  left: 0;
  padding: 1rem 5rem 1rem 1rem;
  background: linear-gradient(to right, $color-white 70%, transparent);
}

h2 {
  line-height: 1.25;
  margin: 0;
  text-align: center;
  @include seperator;
}

p {
  font-size: 1rem;
  line-height: 1.5;
  display: flex;
  align-items: center;
}

.description {
  margin-top: 0.5em;
  @include seperator;
}

.icon {
  @include size($portfolio-icon-size);
  display: block;
  margin: 0 0.5em 0 0;
}

.canvas-wrapper,
canvas {
  position: absolute;
  top: 0;
}

.canvas-wrapper {
  @include size(80%, 100%);
  right: 0;
}

canvas {
  @include size(100%);
  left: 0;
}
</style>
