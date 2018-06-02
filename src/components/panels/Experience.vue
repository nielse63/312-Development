<template>
  <section id="experience" class="experience panel" :class="classObject">
    <animated-code></animated-code>
    <article class="container">
      <panel-title :title="title"></panel-title>
      <div class="content">
        <p>I've been a <mark>software engineer for over {{years}} years</mark>, and my experience spans many different languages, libraries and frameworks. As a senior ui engineer, my responsibilities include curating and maintaining style guides and best practices shared across multiple teams; ensuring products are performant and accessible; and working with business, legal, and marketing to make sure our apps meet all company objectives. I do all this while introducing the latest technology and tools into our stack to stay modern.</p>
        <p>Outside of work, I create and contribute to <a href="https://github.com/nielse63" target="_blank">open source software</a> and frequently publish node modules to <a href="https://npmjs.org/~nielse63" target="_blank">NPM</a>. Collectively, my projects have received {{stars}} stars on GitHub and {{downloads}} downloads from NPM.</p>
      </div>
      <footer class="panel__footer">
        <h3>Get my Resume</h3>
        <ul class="inline-list">
          <li>
            <external-link :href="resume.link" class="button button__ghost--pink">View Online</external-link>
          </li>
          <li>
            <external-link :href="resume.pdf" class="button button__ghost--pink">Download PDF</external-link>
          </li>
          <li>
            <external-link :href="resume.docx" class="button button__ghost--pink">Download .docx</external-link>
          </li>
          <li>
            <scroll-to selector="#contact" class="button--pink">Contact Me</scroll-to>
          </li>
        </ul>
      </footer>
    </article>
  </section>
</template>

<script>
  import PanelTitle from '@/components/PanelTitle';
  import AnimatedCode from '@/components/AnimatedCode';
  import ExternalLink from '@/components/ExternalLink';
  import ScrollTo from '@/components/ScrollTo';
  import content from '@/lib/content';
  import panelMixin from '@/mixins/panel-mixin';

  export default {
    name:       'experience',
    mixins:     [panelMixin],
    components: {
      PanelTitle,
      AnimatedCode,
      ExternalLink,
      ScrollTo,
    },
    props: {
      entry: {
        type: Object,
        default() {
          return {
            title:     '',
            direction: 'Left',
            content:   '',
          };
        },
      },
    },
    data() {
      return {
        title:     'My Experience',
        years:     9,
        stars:     500,
        downloads: 1000,
        resume:    content.resume,
      };
    },
  };
</script>

<style lang="scss" scoped>
  @import 'src/assets/styles/lib/vars';

  .experience {
    color: $color-white;
    background-color: $color-blue;
  }

  .inline-list {
    display: flex;

    li {
      margin: 0;

      + li {
        margin-left: 1rem;
      }
    }
  }

  .content {
    a {
      border-bottom: 2px solid $color-pink;

      &:hover,
      &:active,
      &:focus {
        background-color: fade-out($color-pink, 0.5);
      }
    }
  }

  // mark {
  //   background-color: fade-out(#fe628e, 0.1);
  // }
</style>
