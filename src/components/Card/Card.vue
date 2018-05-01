<template>
  <div class="card">
    <figure class="card__image" :data-lazy-load="image">
      <template v-if="externalLink">
        <a :href="url" target="_blank" rel="noopener noreferrer" :title="title">
          <h3 class="card__title">{{title}}</h3>
        </a>
      </template>
      <template v-else>
        <a :href="url"><h3 class="card__title">{{title}}</h3></a>
      </template>
    </figure>
    <div class="card__content">
      <p>{{content}}</p>
    </div>
    <footer class="card__footer">
      <template v-if="externalLink">
        <external-link :href="url" :text="readmore" />
      </template>
      <template v-else>
        <a :href="url" :title="title">{{readmore}}</a>
      </template>
    </footer>
  </div>
</template>

<script>
  import ExternalLink from '@/components/ExternalLink';
  import defaultImage from '@/assets/images/articles/medium.min.jpg';

  export default {
    name: 'card',
    components: {
      ExternalLink,
    },
    props: {
      title: {
        type: String,
        require: true,
      },
      image: {
        type: String,
        default: defaultImage,
      },
      content: {
        type: String,
        default: '',
      },
      url: {
        type: String,
      },
      readmore: {
        type: String,
        default: 'Read More',
      },
    },
    computed: {
      externalLink() {
        return this.url[0] !== '/' && this.url.indexOf(window.location.host) < 0;
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import '../../assets/styles/main';

  .card {
    box-shadow: 0 0 0 1px $border-color;
    display: flex;
    flex-direction: column;
    width: 100%;

    &__title {
      font-size: 24px;
      margin: 0;
      border-bottom: 1px solid $border-color;
    }

    &__image {
      margin: 0;
      height: 150px;
      background-color: $color-pink;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      color: $color-white;
      position: relative;
      user-select: none;

      &:before {
        @include size(100%);

        content: '';
        background: linear-gradient(to bottom, fade-out($text-color, 0.95) 0%, fade-out($text-color, 0.25) 75%);
        position: absolute;
        top: 0;
        left: 0;
      }

      a {
        @include size(100%);

        display: block;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
      }

      .card {
        &__title {
          position: absolute;
          bottom: 1rem;
          left: 1rem;
          right: 1rem;
          border: 0;
          font-size: 20px;
        }
      }
    }

    &__content {
      padding: 1rem;
      font-size: 1rem;
      line-height: 1.5;
    }

    &__footer {
      border-top: 1px solid $border-color;
      font-size: 12px;
      letter-spacing: 2px;

      a {
        $link-after-left: 3px;

        font-weight: 900;
        text-transform: uppercase;
        color: $color-pink;
        position: relative;
        display: block;
        padding: 1rem;
        background-color: fade-out($color-pink, 1);
        transition: background-color $link-transition-duration;

        &:after {
          content: '\203A';
          position: relative;
          left: $link-after-left;
          transition: left $link-transition-duration;
        }

        &:hover {
          background-color: fade-out($color-pink, 0.95);

          &:after {
            left: ($link-after-left + 5px);
          }
        }
      }
    }

    > * {
      flex: 0 1 auto;
    }

    > .card {
      &__content {
        flex: 1 0 auto;
      }
    }
  }
</style>
