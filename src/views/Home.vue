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
  // methods: {
  //   isInView({ intersectionRect }) {
  //     return intersectionRect.height / window.innerHeight >= 0.75;
  //   },
  //   getOptions() {
  //     const options = {
  //       root:       null,
  //       rootMargin: '0px',
  //       threshold:  [],
  //     };
  //     for (let i = 0; i <= 1; i += 0.05) {
  //       options.threshold.push(i);
  //     }
  //     return options;
  //   },
  //   getChildrenObject() {
  //     const childrenObject = {};
  //     this.$children.forEach((child) => {
  //       const { id } = child.$el;
  //       childrenObject[id] = child;
  //     });
  //     return childrenObject;
  //   },
  //   setObserver() {
  //     const options = this.getOptions();
  //     const childrenObject = this.getChildrenObject();
  //     const observer = new IntersectionObserver((entries) => {
  //       entries
  //         .filter(entry => entry.isIntersecting)
  //         .filter(entry => this.isInView(entry))
  //         .forEach((entry) => {
  //           const { target } = entry;
  //           observer.unobserve(target);
  //           this.$nextTick(() => {
  //             const component = childrenObject[target.id];
  //             component.$children[0].inview = 'true';
  //           });
  //         });
  //     }, options);
  //     this.$el.querySelectorAll('.content-section').forEach((element) => {
  //       observer.observe(element);
  //     });
  //   },
  // },
  // mounted() {
  //   this.setObserver();
  // },
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/lib/vars";
</style>
