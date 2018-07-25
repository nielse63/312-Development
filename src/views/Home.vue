<template>
  <div class="home">
    <intro-panel
      :title="title"
      :subtitle="subtitle"
    ></intro-panel>
    <div class="content">
      <content-section-about></content-section-about>
      <content-section-experience></content-section-experience>
      <content-section-portfolio></content-section-portfolio>
      <content-section-skills-and-tools></content-section-skills-and-tools>
      <content-section-contact></content-section-contact>
    </div>
  </div>
</template>

<script>
import { title, subtitle } from '@/lib/content';
import IntroPanel from '@/components/IntroPanel';
import ContentSectionAbout from '@/components/ContentSectionAbout';
import ContentSectionExperience from '@/components/ContentSectionExperience';
import ContentSectionPortfolio from '@/components/ContentSectionPortfolio';
import ContentSectionSkillsAndTools from '@/components/ContentSectionSkillsAndTools';
import ContentSectionContact from '@/components/ContentSectionContact';

export default {
  name:       'Home',
  components: {
    IntroPanel,
    ContentSectionAbout,
    ContentSectionExperience,
    ContentSectionPortfolio,
    ContentSectionSkillsAndTools,
    ContentSectionContact,
  },
  data() {
    return {
      title,
      subtitle,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/lib/vars";

// .content {
//   padding-top: 100vh;
// }
</style>
