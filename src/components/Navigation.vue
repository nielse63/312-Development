<template>
  <aside class="navigation">
    <button @click="toggleMenu" aria-label="Close">
      <i class="fa fa-close" aria-hidden="true"></i>
    </button>
    <ul class="navigation__list">
      <li
        v-for="route in routes"
        :key="route.title"
      >
        <router-link :to="{ name: route.name }">
          <i v-bind:class="route.cls" aria-hidden="true"></i> {{route.title}}
        </router-link>
      </li>
    </ul>
  </aside>
</template>

<script>
  import { mapActions } from 'vuex';

  export default {
    name: 'navigation',
    computed: {
      routes() {
        return this.$router.options.routes
          .filter(object => !object.props['hidden-from-nav'])
          .map((object) => {
            const { name } = object;
            const cls = {
              fa: true,
            };
            cls[`fa ${object.props.icon}`] = true;

            return Object.assign({}, {
              title: name.substr(0, 1).toUpperCase() + name.substr(1),
              hidden: object.props.hidden || false,
              cls,
            }, object);
          });
      },
    },
    methods: {
      ...mapActions([
        'toggleMenu',
      ]),
    },
  };
</script>

<style lang="scss" scoped>
  @import "../assets/styles/main";

  .navigation {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: $color-white;
    z-index: 2;
    width: 100vw;
    font-weight: 900;
    padding: 3em 0;
    text-transform: uppercase;
    transition: transform $transition-duration;
    transform: translate(100%, 0);

    @media (max-width: $tablet-width-max) {
      font-size: 20px;
    }

    @media (min-width: $mobile-width) {
      width: 70vw;
    }

    @media (min-width: $tablet-width) {
      width: 40vw;
      min-width: 300px;
    }

    @media (min-width: $desktop-width) {
      width: 25vw;
    }

    .menu-open & {
      transform: translate(0, 0);
    }

    &__list {
      transform: translate3d(0, 100%, 0);

      li {
        transition-duration: ($transition-duration + 0.2s);

        @include nav-items(4);
      }

      &,
      li {
        transition: transform 0s ($transition-duration / 2) cubic-bezier(0.7, 0, 0.3, 1);

        .menu-open & {
          transform: translate3d(0, 0, 0);
          transition: transform $transition-duration cubic-bezier(0.7, 0, 0.3, 1);
        }
      }
    }
  }

  button {
    position: absolute;
    padding: 0.5em;
    line-height: 1;
    top: 1em;
    right: 1.5em;
    text-align: center;
    background: none;
  }

  a {
    padding: 1em 2em;
    display: block;

    &:hover,
    &:active,
    &.active {
      color: #ac3537;
    }

    i {
      margin-right: 0.5em;
    }
  }
</style>
