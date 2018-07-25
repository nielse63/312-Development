<template>
  <content-section title="Skills and Tools">
    <article>
      <div class="tools">
        <template v-for="(tool, i) in tools">
          <figure class="tool" :key="i" v-html="tool.image"></figure>
        </template>
      </div>
    </article>
  </content-section>
</template>

<script>
import ContentSection from '@/components/ContentSection';
import ExternalLink from '@/components/ExternalLink';
import languages from '@/lib/content/experience/languages';
import frameworks from '@/lib/content/experience/frameworks';
import buildTools from '@/lib/content/experience/build-tools';
import libraries from '@/lib/content/experience/libraries';
import testing from '@/lib/content/experience/testing';

export default {
  name:       'ContentSectionSkillsAndTools',
  components: {
    ContentSection,
    ExternalLink,
  },
  data() {
    return {
      tools: [
        ...languages.items,
        ...frameworks.items,
        ...buildTools.items,
        ...libraries.items,
        ...testing.items,
      ],
    };
  },
};
</script>

<style scoped lang="scss">
@import "../assets/styles/lib/mixins";
@import "../assets/styles/lib/vars";

.content-section {
  display: block;
}

article {
  background-image: linear-gradient(#fec163, #de4313);

  p {
    @include basic-content-transform;
    transition-delay: 0.25s;

    + p {
      transition-delay: 0.5s;
    }
  }
}

.tools {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

.tool {
  margin: 0;
  padding: 1rem;
  display: block;
  width: 100px;
}
</style>
