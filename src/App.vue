<template>
  <div id="main" class="app">
    <app-navigation></app-navigation>
    <transition>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import AppNavigation from '@/components/AppNavigation';

export default {
  name:       'app',
  components: {
    AppNavigation,
  },
};
</script>

<style lang="scss">
@import 'assets/styles/global';
</style>
