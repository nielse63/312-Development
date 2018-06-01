<template>
  <section id="about-me" class="panel about-me" :class="classObject">
    <article class="container">
      <panel-title
        :title="title"
        :dir="dir"
        color="purple"
      ></panel-title>
      <div class="content">
        <p>I'm a <mark>Senior User-Interface Software Engineer</mark> and <mark>Tech Lead</mark> in Chicago, currently creating great user experiences at <external-link href="https://enova.com/">Enova</external-link>. I’ve been in the industry for over {{years}} years, and my experience spans from Node to Ruby, and everything in between. <external-link :href="resume" title="View my resume online">Resume Here</external-link>.</p>
        <p>Aside from writing code I'm an <a href="#">avid traveller</a>, triathlete and long-distance runner, and a huge fan of hiking/camping/fishing (anytning outdoors).</p>
      </div>
      <footer class="panel__footer">
        <p>
          <scroll-to selector="#experience" class="button--purple">My Experience</scroll-to>
        </p>
      </footer>
    </article>
  </section>
</template>

<script>
  import PanelTitle from '@/components/PanelTitle';
  import ExternalLink from '@/components/ExternalLink';
  import ScrollTo from '@/components/ScrollTo';
  import content from '@/lib/content';
  import panelMixin from '@/mixins/panel-mixin';

  export default {
    name:       'about-me',
    mixins:     [panelMixin],
    components: {
      PanelTitle,
      ExternalLink,
      ScrollTo,
    },
    data() {
      return {
        dir:    'right',
        title:  'About Me',
        years:  9,
        resume: content.resume.link,
      };
    },
  };
</script>

<style lang="scss" scoped>
  @import 'src/assets/styles/lib/vars';

  .about-me {
    background-color: $color-white;

    &:before {
      opacity: 0.5;
    }
  }

  mark {
    background-color: fade-out($color-blue, 0.1);
  }
</style>
