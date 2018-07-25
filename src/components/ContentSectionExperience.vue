<template>
  <content-section title="Experience">
    <article>
      <div class="boxes">
        <template v-for="(box, i) in boxes">
          <experience-box
            :key="i"
            :index="i"
            :header="box.header"
            :description="box.description"
          ></experience-box>
        </template>
      </div>
    </article>
    <footer>
      <p>To learn more about my experience, skills, and background, <external-link :href="resume" title="View my resume online">check out my resume</external-link>.</p>
    </footer>
  </content-section>
</template>

<script>
import { resume } from '@/lib/content';
import ContentSection from '@/components/ContentSection';
import ExperienceBox from '@/components/ExperienceBox';
import ExternalLink from '@/components/ExternalLink';

export default {
  name:       'ContentSectionExperience',
  components: {
    ContentSection,
    ExperienceBox,
    ExternalLink,
  },
  data() {
    return {
      resume: resume.link,
      boxes:  [
        {
          header:      '10',
          description: 'years as a software engineer',
        },
        {
          header:      '100',
          description: 'public github repos',
        },
        {
          header:      '10',
          description: 'git commits',
        },
        {
          header:      '100',
          description: 'GitHub stars',
        },
        {
          header:      '10',
          description: 'public gists',
        },
        {
          header:      '100',
          description: 'published node modules',
        },
        {
          header:      '100',
          description: 'npm downloads',
        },
      ],
    };
  },
};
</script>

<style scoped lang="scss">
@import "../assets/styles/lib/mixins";
@import "../assets/styles/lib/vars";

.content-section {
  background-image: linear-gradient(#0a93f5, #14b0d7);
  color: $color-white;
}

article {
  padding-top: 5rem;
  padding-bottom: 5rem;
  line-height: 1;
  text-align: center;
  font-weight: 700;
}

.boxes {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

footer {
  @include basic-content-transform;
  padding: 0 10rem 7.5rem;
  text-align: center;
}
</style>
