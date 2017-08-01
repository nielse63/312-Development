<template>
  <section class="panel">
    <div class="container">
      <panel-header title="Proficiencies &amp; Tools" />
      <template v-for="(items, category) in tools">
        <h3>{{category | titlize}}</h3>
        <div class="row row__middle">
          <div class="col" v-for="item in items">
            <proficiency-item
            :name="item.name"
            :image="item.image"
            />
          </div>
        </div>
      </template>
    </div>
  </section>
</template>

<script>
  import PanelHeader from '@/components/Panels/PanelHeader';
  import ProficiencyItem from '@/components/Portfolio/ProficiencyItem';

  export default {
    name: 'proficiencies-panel',
    components: {
      PanelHeader,
      ProficiencyItem,
    },
    data() {
      /* eslint-disable global-require */
      // logo sources https://worldvectorlogo.com/
      return {
        tools: {
          frameworks: [{
            name: 'Vue.js',
            image: require('@/assets/images/clean/vue.svg'),
          }, {
            name: 'react',
            image: require('@/assets/images/clean/react.svg'),
          }, {
            name: 'preact',
            image: require('@/assets/images/clean/preact.svg'),
          }, {
            name: 'angular',
            image: require('@/assets/images/clean/angular.svg'),
          }, {
            name: 'ember',
            image: require('@/assets/images/clean/ember.svg'),
          }],

          'build-systems': [{
            name: 'webpack',
            image: require('@/assets/images/clean/webpack.svg'),
          }, {
            name: 'gulp',
            image: require('@/assets/images/clean/gulp.svg'),
          }, {
            name: 'grunt',
            image: require('@/assets/images/clean/grunt.svg'),
          }],

          'utility-modules': [{
            name: 'babel',
            image: require('@/assets/images/clean/babel.svg'),
          }, {
            name: 'eslint',
            image: require('@/assets/images/clean/eslint.svg'),
          }, {
            name: 'stylelint',
            image: require('@/assets/images/clean/stylelint.svg'),
          }, {
            name: 'postcss',
            image: require('@/assets/images/clean/postcss.svg'),
          }],

          testing: [{
            name: 'mocha',
            image: require('@/assets/images/clean/mocha.svg'),
          }, {
            name: 'karma',
            image: require('@/assets/images/clean/karma.svg'),
          }, {
            name: 'nightwatch',
            image: require('@/assets/images/clean/nightwatch.svg'),
          }, {
            name: 'jasmine',
            image: require('@/assets/images/clean/jasmine.svg'),
          }, {
            name: 'chai',
            image: require('@/assets/images/clean/chai.svg'),
          }, {
            name: 'sinon',
            image: require('@/assets/images/clean/sinon.svg'),
          }, {
            name: 'ava',
            image: require('@/assets/images/clean/ava.svg'),
          }],

          'package-managers': [{
            name: 'yarn',
            image: require('@/assets/images/clean/yarn.svg'),
          }, {
            name: 'npm',
            image: require('@/assets/images/clean/npm.svg'),
          }],
        },
      };
    },
    filters: {
      titlize(value = '') {
        return value.replace(/-/g, ' ').titleCase();
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/main";

  .row {
    @media (max-width: $tablet-width-max) {
      flex-wrap: wrap;
      justify-content: center;
    }

    + h3 {
      margin-top: 2em;
      padding-top: 2em;
      border-top: 1px solid $border-color;
    }

    .col {
      flex: 1 0 percentage(1 / 3);
      max-width: percentage(1 / 3);
      max-height: 200px;

      @media (max-width: $tablet-width-max) {
        padding: 1rem;
        // height: 200px;
      }

      @media (min-width: $tablet-width) {
        flex: 1;
        max-width: 150px;
      }
    }
  }
</style>
