<template>
  <header class="header">
    <!-- <h1 class="logo">
      <router-link :to="{ name: 'Home' }">
        <img v-show="!hasClass" src="../assets/images/icon.svg" alt="312 Development" width="42">
        <img v-show="hasClass" src="../assets/images/icon-pink.svg" alt="312 Development" width="42"> 312 Development
      </router-link>
    </h1> -->
    <button class="header__button" @click="toggleMenu">Menu <i class="fa fa-bars" aria-hidden="true"></i></button>
  </header>
</template>

<script>
  import { mapActions } from 'vuex';
  // import { getPanelTop } from '@/lib/utils';

  export default {
    name: 'app-header',
    data() {
      return {
        height: 0,
        panels: [],
        hasClass: false,
        lastChecked: 0,
      };
    },
    methods: {
      ...mapActions([
        'toggleMenu',
      ]),
      // onscroll() {
      //   // guard
      //   if (!this.panels.length) {
      //     return;
      //   }

      //   // guard
      //   const now = Date.now();
      //   if ((now - this.lastChecked) < 150) {
      //     return;
      //   }
      //   this.lastChecked = now;

      //   // set and check bottom of header
      //   const bottom = this.height + window.scrollY;
      //   if (bottom < this.panels[0].top) {
      //     if (this.hasClass) {
      //       this.hasClass = false;
      //       this.$el.classList.remove('header__pink');
      //     }
      //     return;
      //   }

      //   this.panels.forEach((range) => {
      //     if (bottom >= range.top && bottom < range.bottom) {
      //       if (!this.hasClass && range.addClass) {
      //         this.hasClass = true;
      //         this.$el.classList.add('header__pink');
      //       } else if (this.hasClass && !range.addClass) {
      //         this.hasClass = false;
      //         this.$el.classList.remove('header__pink');
      //       }
      //     }
      //   });
      // },
      // onupdate() {
      //   // set header height
      //   if (!this.height) {
      //     this.height = document.querySelector('.header').offsetHeight / 2;
      //   }

      //   // set header height
      //   this.panels = getPanelTop();

      //   window.removeEventListener('scroll', this.onscroll);
      //   window.addEventListener('scroll', this.onscroll.bind(this), false);
      // },
    },
    // beforeMount() {
    //   document.addEventListener('app-update', this.onupdate.bind(this), false);
    // },
    // mounted() {
    //   this.onupdate();
    //   this.onscroll();
    // },
  };
</script>

<style lang="scss" scoped>
  @import "../assets/styles/main";

  .header {
    display: flex;
    justify-content: space-between;
    position: fixed;
    top: 0;
    right: 0;
    // left: 0;
    padding: 1em;
    z-index: 1;
    color: $color-white;

    &__pink {
      color: $color-pink;
    }

    &__button {
      padding: 1em 1.5em;
      text-transform: uppercase;
      font-weight: 700;
      font-size: 12px;
      letter-spacing: 0.25em;
      background-color: $color-white;
      border-radius: 2em;
      border: 1px solid $banner-color;
      color: $text-color;
    }
  }

  // .logo {
  //   margin: 0;
  //   font-size: 20px;
  //   line-height: (42 / 20);
  //   text-transform: uppercase;
  //   // color: $color-white;

  //   a {
  //     display: flex;
  //     align-items: center;
  //     transition: none;
  //     // -webkit-text-stroke-width: 1px;
  //     // -webkit-text-stroke-color: $banner-color;
  //     text-shadow: -1px -1px 0 $banner-color,
  //                  1px -1px 0 $banner-color,
  //                  -1px 1px 0 $banner-color,
  //                  1px 1px 0 $banner-color;
  //     letter-spacing: 3px;
  //   }

  //   img {
  //     margin-right: 0.5em;
  //   }
  // }
</style>
