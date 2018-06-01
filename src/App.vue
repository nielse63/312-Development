<template>
  <div id="main" class="app">
    <link rel="preload" :href="trianglify" as="image">
    <intro></intro>
    <about-me></about-me>
    <!-- <process></process> -->
    <experience></experience>
    <contact></contact>
    <social-media></social-media>
  </div>
</template>

<script>
  // import { getEntries, getPanelsContent } from '@/lib/contentful';
  import Intro from '@/components/panels/Intro';
  import AboutMe from '@/components/panels/AboutMe';
  import Process from '@/components/panels/Process';
  import Experience from '@/components/panels/Experience';
  import Contact from '@/components/panels/Contact';
  import SocialMedia from '@/components/panels/SocialMedia';
  import trianglify from '@/assets/images/trianglify.svg';

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
    data() {
      return {
        trianglify,
        // entries: {
        //   about:       null,
        //   expierience: null,
        // },
      };
    },
    created() {
      const style = document.createElement('style');
      style.innerText = `.panel:before { background-image: url('${this.trianglify}'); }`;
      document.head.appendChild(style);
    },
    // async beforeMount() {
    //   const entries = await getEntries();
    //   console.log(entries);
    //   const response = await getPanelsContent();
    //   const aboutContent = response.filter(object => object.title.toLowerCase().startsWith('about'))[0];
    //   const experienceContent = response.filter(object => object.title.toLowerCase().startsWith('experience'))[0];
    //   this.entries = {
    //     about:      aboutContent,
    //     experience: experienceContent,
    //   };
    //   console.log(this.entries);
    // },
    // mounted() {
    //   /* eslint-disable no-console */
    //   const client = createClient({
    //     space:       'o4irotzruet8',
    //     accessToken: 'b162fa3e196303db85b6f21ca47b754d76d21eecbeedf012e66ed1e866747fae',
    //   });
    //   console.log(client);
    //   client.getContentTypes()
    //     .then((response) => {
    //       console.log(response);
    //     }).catch((err) => {
    //       console.error(err);
    //     });
    // },
  };
</script>

<style lang="scss">
  @import 'assets/styles/global';
</style>
