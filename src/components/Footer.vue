<template>
  <footer class="footer">
    <figure class="pattern" :data-lazy-load="pattern"></figure>
    <ul class="footer__menu">
      <li v-for="route in routes" v-if="!route.hidden">
        <router-link :to="{ name: route.name }">{{route.title}}</router-link>
      </li>
    </ul>
  </footer>
</template>

<script>
  import Pattern from '@/assets/images/pattern.jpg';

  export default {
    name: 'app-footer',
    data() {
      return {
        pattern: Pattern,
      };
    },
    computed: {
      routes() {
        return this.$router.options.routes.map((object) => {
          const name = object.name;
          return Object.assign({}, {
            title: name.substr(0, 1).toUpperCase() + name.substr(1),
            hidden: object.props.hidden || false,
          }, object);
        });
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import "../assets/styles/main";

  .footer {
    $font-size: 14px;
    $letter-spacing: 4px;

    background-color: $color-blue;
    position: relative;
    padding: 5rem 3rem;
    font-size: $font-size;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: strip-unit(($letter-spacing / $font-size)) + em;

    &__menu {
      position: relative;
      text-align: center;
      margin: 0 auto;

      @media (max-width: $tablet-width-max) {
        width: 75vw;
      }

      @media (min-width: $tablet-width) {
        width: 700px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      li {
        @include flex-item(100%);

        @media (min-width: $tablet-width) {
          @include flex-item(25%);
        }
      }
    }
  }

  a {
    display: block;
    background-color: $color-white;
    transition: background-color $link-transition-duration;
    color: #115292;
    padding: 2em;

    @media (min-width: $tablet-width) {
      padding: 1em 2em;
    }

    &:hover,
    &:active,
    &.active {
      background-color: #e6f1fb;
    }
  }

  .pattern {
    @include size(100%);

    position: absolute;
    top: 0;
    left: 0;
    overflow: hidden;
    opacity: 0.65;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    margin: 0;
  }
</style>
