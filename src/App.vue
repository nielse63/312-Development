<template>
  <div id="main" class="app">
    <intro></intro>
    <!-- <banner></banner>
    <something-about></something-about>
    <something-experience></something-experience>
    <something-contact></something-contact>
    <something-footer></something-footer> -->
  </div>
</template>

<script>
  import Intro from '@/components/panels/Intro';
  // import SectionAbout from '@/components/SectionAbout';
  // import SectionExperience from '@/components/SectionExperience';
  // import SectionContact from '@/components/SectionContact';
  // import SectionFooter from '@/components/SectionFooter';

  export default {
    name:       'app',
    components: {
      Intro,
      // SectionAbout,
      // SectionExperience,
      // SectionContact,
      // SectionFooter,
    },
    mounted() {
      // eslint-disable-next-line
      console.log('howdy');
    },
  };
</script>

<style lang="scss">
  @import 'assets/styles/global';
</style>
