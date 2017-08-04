<template>
 <div class="timeline__item" v-bind:class="this.class" data-is-in-view>
  <header class="timeline__item__header">
    <h3>{{this.title}}</h3>
  </header>
  <article class="timeline__item__content">
    <p>{{this.content}}</p>
  </article>
  <footer class="timeline__item__footer">
    <p>Started on {{this.dateString}}</p>
  </footer>
</div>
</template>

<script>
  import { format } from 'date-fns';
  import isVisible from '@/lib/is-visible';

  export default {
    name: 'timeline-item',
    props: {
      title: {
        type: String,
        default: '',
      },
      content: {
        type: String,
        default: '',
      },
      date: {
        default: '',
      },
      even: {
        type: Boolean,
        default: false,
      },
    },
    computed: {
      class() {
        return {
          timeline__item__even: this.even,
          timeline__item__odd: !this.even,
        };
      },
      dateString() {
        return format(this.date, 'MMMM Do, YYYY');
      },
    },
    mounted() {
      isVisible();
    },
  };
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/main";

  .timeline {
    &__item {
      padding: 1rem;
      border: 1px solid $banner-color;
      position: absolute;
      top: 50%;
      transform: translate(0, -50%) rotateX(90deg);
      transform-style: preserve-3d;
      transition: transform 0.5s 0.5s;
      transform-origin: center;

      @media (min-width: $tablet-width) {
        width: 50%;
      }

      @media (max-width: $tablet-width-max) {
        width: calc(100% - 25px);
      }

      &:before,
      &:after {
        border: 1rem solid transparent;
        border-left-color: $banner-color;
        content: '';
        position: absolute;
        top: 50%;
        left: 100%;
        transform: translate(0, -50%);
      }

      &:after {
        border-left-color: $color-white;
        transform: translate(-1px, -50%);
      }

      &__odd {
        @media (min-width: $tablet-width) {
          left: 16px;
        }

        @media (min-width: $tablet-width) {
          margin-left: 50%;
        }

        &:before,
        &:after {
          @media (min-width: $tablet-width) {
            border-left-color: transparent;
            border-right-color: $banner-color;
            left: auto;
            right: 100%;
          }
        }

        &:after {
          @media (min-width: $tablet-width) {
            border-right-color: $color-white;
            transform: translate(1px, -50%);
          }
        }
      }

      &__even {
        @media (min-width: $tablet-width) {
          text-align: right;
          left: -16px;
        }
      }

      &__header {
        letter-spacing: 2px;
        text-transform: uppercase;

        h3 {
          font-size: 1rem;
        }
      }

      &__content {
        font-size: 18px;
      }

      &__footer {
        font-size: 1rem;
        font-weight: bold;
        letter-spacing: 2px;
      }
    }
  }

  .visible {
    transform: translate(0, -50%);
  }
</style>
