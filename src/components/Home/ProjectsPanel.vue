<template>
  <section class="panel panel__pink">
    <div class="container">
      <div class="row row__middle">
        <div class="col col__left">
          <article>
            <img :data-lazy-load="image" alt="Vue.js PWA">
          </article>
        </div>
        <div class="col col__right">
          <aside class="projects">
            <h2 class="panel__title">Latest Work</h2>
            <ul class="projects__list">
              <li
                v-for="(repo, index) in repos"
                :data-index="index"
                :key="repo.title"
              >
                <button class="projects__button" v-bind:class="repo.cls" @click="onclick" :aria-label="repo.title">{{repo.title}}</button>
              </li>
            </ul>
            <div
              v-for="(repo, index) in repos"
              v-show="activeIndex === index"
              class="projects__description"
              :key="repo.title"
            >
              <p>{{repo.content}}</p>
              <ul class="projects__list">
                <li><i class="fa fa-download" aria-hidden="true"></i> {{repo.downloads}} downloads</li>
                <li><i class="fa fa-star-o" aria-hidden="true"></i> {{repo.stars}} stars</li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import { getGithubData, getNPMInfo } from '@/lib/data';
  import Octocat from '@/assets/images/octocat.png';
  import Image from '@/assets/images/logo.png';

  export default {
    name: 'projects-panel',
    data() {
      return {
        activeIndex: 0,
        repos: [],
        image: Image,
      };
    },
    watch: {
      repos(newValue, oldValue) {
        /* istanbul ignore if */
        if (oldValue.length) {
          return;
        }
        newValue.forEach((repo, i) => {
          const p = new Promise(async (resolve) => {
            const { title } = repo;
            const module = await getNPMInfo(title);
            resolve(module);
          });
          p.then((module) => {
            this.repos[i].downloads = module.totalDownloads;
          });
        });
      },
      activeIndex(newIndex) {
        const activeButton = this.repos.filter(button => button.cls.active === true);
        activeButton[0].cls.active = false;
        this.repos[newIndex].cls.active = true;
      },
    },
    methods: {
      onclick({ target }) {
        const index = parseInt(target.closest('li').getAttribute('data-index'), 10);
        if (index !== this.activeIndex) {
          this.activeIndex = index;
        }
      },
      formatRepos(array) {
        return array.map((repo) => {
          const image = repo.image || Octocat;
          return {
            title: repo.name,
            content: repo.description,
            image,
            stars: repo.stargazers_count,
            downloads: 0,
            cls: {
              active: false,
            },
          };
        }).sort((a, b) => {
          if (a.stars > b.stars) { return -1; }
          if (a.stars < b.stars) { return 1; }
          return 0;
        }).map((repo, i) => {
          repo.cls.active = !i;
          return repo;
        });
      },
    },
    async beforeMount() {
      const data = await getGithubData();
      this.repos = this.formatRepos(data.slice(0, 3));
    },
  };
</script>

<style lang="scss" scoped>
  @import '../../assets/styles/main';

  .col {
    &__left,
    &__right {
      @media (min-width: $large-width) {
        @include flex-item(50%);
      }
    }

    &__left {
      text-align: center;

      @media (max-width: $tablet-width-max) {
        display: none;
      }

      @media (min-width: $tablet-width) {
        @include flex-item(30%);
      }
    }

    &__right {
      @include flex-item(100%);

      @media (min-width: $tablet-width) {
        @include flex-item(70%);
      }
    }
  }

  .projects {
    &__description {
      font-size: 20px;
      line-height: 1.5;

      p {
        padding: 2em 0;
        margin: 0;
        min-height: 140px;
      }
    }

    &__button {
      $font-size: 14px;
      $after-height: ($font-size / 8);
      $after-height-hover: ($after-height + 2px);
      $link-color: $color-white;

      font-size: $font-size;
      letter-spacing: 3px;
      font-weight: 700;
      display: inline-block;
      padding: 0.5em;
      white-space: nowrap;
      position: relative;
      background: none;

      &:after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 0;
        background-color: $link-color;
      }

      &.active {
        &,
        &:hover,
        &:active {
          &:after {
            height: $after-height-hover;
          }
        }
      }

      &:hover,
      &:active {
        &:after {
          height: $after-height;
        }
      }
    }

    &__list {
      @media (min-width: $mobile-width) {
        display: flex;
      }

      > li {
        + li {
          @media (max-width: $mobile-width-max) {
            padding-top: 1em;
          }

          @media (min-width: $mobile-width) {
            padding-left: 1em;
          }
        }
      }
    }
  }
</style>
