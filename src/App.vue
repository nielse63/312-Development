<template>
  <div id="main" class="app">
    <intro></intro>
    <about-me></about-me>
    <process></process>
    <experience></experience>
    <contact></contact>
    <social-media></social-media>
  </div>
</template>

<script>
  import Intro from '@/components/panels/Intro';
  import AboutMe from '@/components/panels/AboutMe';
  import Process from '@/components/panels/Process';
  import Experience from '@/components/panels/Experience';
  import Contact from '@/components/panels/Contact';
  import SocialMedia from '@/components/panels/SocialMedia';
  // const AboutMe = () => ({
  //   component: import(/* webpackChunkName: "about-me" */ '@/components/panels/AboutMe'),
  // });
  // const Process = () => ({
  //   component: import(/* webpackChunkName: "process" */ '@/components/panels/Process'),
  // });
  // const Experience = () => ({
  //   component: import(/* webpackChunkName: "experience" */ '@/components/panels/Experience'),
  // });
  // const Contact = () => ({
  //   component: import(/* webpackChunkName: "contact" */ '@/components/panels/Contact'),
  // });
  // const SocialMedia = () => ({
  //   component: import(/* webpackChunkName: "social-media" */ '@/components/panels/SocialMedia'),
  // });

  export default {
    name:       'app',
    components: {
      Intro,
      AboutMe,
      Process,
      Experience,
      Contact,
      SocialMedia,
    },
  };
</script>

<style lang="scss">
  @import 'assets/styles/global';
</style>
