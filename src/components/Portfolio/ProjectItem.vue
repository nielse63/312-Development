<template>
  <div class="project">
    <header class="project__header">
      <h3 class="project__title">
        <external-link :href="url" :text="name" />
      </h3>
    </header>
    <article class="project__content">
      <p v-if="description"><strong>{{description}}</strong></p>
      <ul class="project__data">
        <li class="downloads">
          <p><i class="fa fa-download" aria-hidden="true"></i> {{downloads}} Downloads</p>
        </li>
        <li class="stars">
          <p><i class="fa fa-star" aria-hidden="true"></i> {{stars}} Stars</p>
        </li>
        <li class="trend">
          <div class="trend__graph" :id="graphID"></div>
        </li>
      </ul>
    </article>
    <footer class="project__footer">
      <external-link :href="url" text="View on npmjs.com" />
    </footer>
  </div>
</template>

<script>
  import Highcharts from 'highcharts';
  import { getNPMInfo } from '@/lib/data';
  import ExternalLink from '@/components/ExternalLink';

  export default {
    name: 'project-item',
    components: {
      ExternalLink,
    },
    props: {
      title: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        downloads: 0,
        trend: [],
        firstDay: '',
      };
    },
    computed: {
      repo() {
        const repository = this.$store.getters.getRepo(this.title);
        if (repository) {
          return repository;
        }
        return {
          description: '',
          stargazers_count: 0,
        };
      },
      description() {
        return this.repo.description;
      },
      stars() {
        return this.repo.stargazers_count;
      },
      graphID() {
        return `${this.title.kebabCase()}-graph`;
      },
      url() {
        return `https://npmjs.com/${this.title}`;
      },
      name() {
        return this.title.replace(/jquery\./, 'jquery-');
      },
    },
    methods: {
      createChart() {
        const max = Math.max.apply(null, this.trend);
        const parent = document.getElementById(this.graphID);
        Highcharts.chart(this.graphID, {
          chart: {
            type: 'spline',
            margin: [0, 0, 0, 0],
            // spacing: [0, 0, 0, 0],
            alignTicks: false,
            height: parent.clientHeight,
            width: parent.clientWidth,
          },
          credits: {
            enabled: false,
          },
          title: {
            text: null,
          },
          legend: {
            enabled: false,
          },
          xAxis: {
            labels: {
              enabled: false,
            },
            title: {
              text: null,
            },
            minorGridLineWidth: 0,
            minorTickLength: 0,
            gridLineWidth: 0,
            tickWidth: 0,
            lineWidth: 0,
          },
          yAxis: {
            title: {
              text: null,
            },
            labels: {
              enabled: false,
            },
            minorGridLineWidth: 0,
            minorTickLength: 0,
            gridLineWidth: 0,
            alternateGridColor: null,
            tickLength: 0,
            min: -1,
            max,
            startOnTick: false,
            endOnTick: false,
          },
          tooltip: {
            formatter() {
              return `${this.y} downloads`;
            },
          },
          plotOptions: {
            spline: {
              lineWidth: 2,
              marker: {
                enabled: false,
              },
            },
          },
          series: [{
            name: 'Downloads',
            data: this.trend,
            color: {
              linearGradient: [0, 0, 0, '100%'],
              stops: [
                ['0%', '#b71c1c'],
                ['33%', '#f3b415'],
                ['66%', '#388e3c'],
              ],
            },
          }],
          navigation: {
            menuItemStyle: {
              fontSize: '10px',
            },
          },
        });
      },
    },
    beforeMount() {
      const p = new Promise(async (resolve) => {
        const module = await getNPMInfo(this.title);
        let firstDownload = false;
        const output = module.downloads.filter((object) => {
          if (!firstDownload && object.downloads) {
            firstDownload = true;
          }
          return firstDownload;
        });
        resolve({
          data: output,
          totalDownloads: module.totalDownloads,
        });
      });
      p.then((output) => {
        this.firstDay = output.data[0].day;
        this.trend = output.data.map(object => object.downloads);
        this.downloads = output.totalDownloads;
        this.createChart();
      }).catch((e) => {
        console.error(e);
      });
    },
  };
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/main";

  $project-header-width-small: 150px;
  $project-header-width: 200px;
  $project-footer-width: 120px;

  .project {
    display: flex;
    border: 1px solid $banner-color;

    @media (max-width: $tablet-width-max) {
      flex-direction: column;
    }

    & + & {
      margin-top: 2rem;
    }

    &__header {
      @media (max-width: $desktop-width-max) {
        text-align: center;
      }

       @media (min-width: $tablet-width) {
        @include flex-item($project-header-width-small);
        display: flex;
        align-items: center;
        justify-content: center;
       }

       @media (min-width: $desktop-width) {
        @include flex-item($project-header-width);
      }

       h3 {
        max-width: 100%;

        @media (min-width: $tablet-width) {
          flex: 1;
          height: 100%;
        }
       }

      a {
        color: $color-pink;
        padding: 1rem;
        display: block;

        @media (min-width: $tablet-width) {
          height: 100%;
          display: flex;
          align-items: center;
        }
      }
    }

    &__content {
      flex: 1 0 auto;
      padding: 1rem;

      @media (min-width: $tablet-width) {
        @include flex-item(calc(100% - (#{$project-footer-width} + #{$project-header-width-small})));
      }

      @media (min-width: $desktop-width) {
        @include flex-item(calc(100% - (#{$project-footer-width} + #{$project-header-width})));
      }

      @media (max-width: $tablet-width-max) {
        border-top: 1px solid $banner-color;
        border-bottom: 1px solid $banner-color;
      }

      @media (min-width: $tablet-width) {
        border-right: 1px solid $banner-color;
        border-left: 1px solid $banner-color;
      }
    }

    &__footer {
      @media (min-width: $tablet-width) {
        @include flex-item($project-footer-width);
      }

      a {
        text-align: center;
        background-color: $color-pink;
        color: $color-white;
        font-weight: 700;
        padding: 1em;
        height: 100%;
        display: block;

        @media (min-width: $tablet-width) {
          display: flex;
          align-items: center;
        }
      }
    }

    &__data {
      $graph-height: 84px;

      white-space: nowrap;
      display: grid;
      grid-template-rows: (76px / 2) 1fr;
      grid-template-columns: 50% 1fr;
      grid-template-areas: "data-one data-two"
                           "graph    graph";

      @media (min-width: $desktop-width) {
        grid-template-columns: 130px 1fr;
        grid-template-areas: "data-one graph"
                             "data-two graph";
      }

      * + & {
        margin-top: 1rem;
        padding-top: 1rem;
        border-top: 1px solid $banner-color;
      }

      .downloads,
      .stars {
        display: flex;
        flex-direction: column;
        justify-content: center;
        white-space: nowrap;
        height: ($graph-height / 2);
      }

      .downloads {
        grid-area: data-one;

        i {
          background: linear-gradient(#7F00FF, #E100FF);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      }

      .stars {
        grid-area: data-two;

        @media (max-width: $desktop-width-max) {
          text-align: right;
        }

        @media (min-width: $desktop-width) {
          justify-content: flex-end;
        }

        i {
          background: linear-gradient(#F3F9A7, #CAC531);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      }

      .trend {
        grid-area: graph;

        @media (min-width: $desktop-width) {
          padding-left: 1rem;
        }

        &__graph {
          height: $graph-height;
          width: 100%;
        }
      }
    }
  }
</style>
