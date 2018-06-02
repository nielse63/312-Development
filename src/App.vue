<template>
  <div id="main" class="app">
    <router-view></router-view>
    <!-- <link rel="preload" :href="trianglify" as="image">
    <intro></intro>
    <about-me></about-me>
    <experience></experience>
    <contact></contact>
    <social-media></social-media> -->
  </div>
</template>

<script>
  import Intro from '@/components/panels/Intro';
  import AboutMe from '@/components/panels/AboutMe';
  import Experience from '@/components/panels/Experience';
  import Contact from '@/components/panels/Contact';
  import SocialMedia from '@/components/panels/SocialMedia';
  import trianglify from '@/assets/images/trianglify.svg';

  export default {
    name:       'app',
    components: {
      Intro,
      AboutMe,
      Experience,
      Contact,
      SocialMedia,
    },
    data() {
      return {
        trianglify,
      };
    },
    created() {
      const style = document.createElement('style');
      style.innerText = `.panel:before { background-image: url('${this.trianglify}'); }`;
      document.head.appendChild(style);
    },
  };
</script>

<style lang="scss">
  @import 'assets/styles/global';
  body {
    font-family: 'Arial';
  }
</style>
