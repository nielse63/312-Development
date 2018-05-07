<template>
  <section id="experience" class="experience panel" :class="classObject">
    <animated-code></animated-code>
    <article class="container">
      <panel-title
        :title="title"
        :dir="dir"
      ></panel-title>
      <div class="content">
        <p>I've been a software engineer for <mark>over {{years}} years</mark>, and my experience spans many
        different languages, libraries and frameworks. As a senior ui engineer, my responsibilities include
        <mark>curating and maintaining style guides</mark> and best practices shared across multiple teams;
        ensuring products are <mark>performant and accessible</mark>; and working with business, legal, and marketing
        to make sure our apps meet all company objectives. I do all this while introducing the <mark>latest
        technology and tools</mark> into our stack to stay modern.</p>
        <p>Outside of work, I create and contribute to <a href="#">open-source software</a> and frequently
        publish node modules to <a href="#">NPM</a>. Collectively, my projects have received {{stars}} stars
        on GitHub and {{downloads}} downloads from NPM.</p>
        <!-- <blockquote>
          Michael always says 'K-I-S-S. Keep it simple, stupid.' Great advice. Hurts my feelings every time.
          <cite>Dright Schrute</cite>
        </blockquote>
        <p>The one thing I always try to do is <mark>keep my work as simple as possible</mark>. Early in my career I found myself creating solutions that were fancier than need be - needlessly creating a complex solution just because I could. But that didn't make the code more readable; it didn't help my team members, and din't help drive the project toward completion.</p> -->
      </div>
      <footer class="panel__footer">
        <h3>Get my Resume</h3>
        <ul class="inline-list">
          <li>
            <a href="#" class="button button__ghost--pink">Resume (.pdf)</a>
          </li>
          <li>
            <a href="#" class="button button__ghost--pink">Resume (Google Docs)</a>
          </li>
          <li>
            <a href="#" class="button button__ghost--pink">Resume (.docx)</a>
          </li>
          <li>
            <a href="#contact-me" class="button button--pink">
              <font-awesome-icon :icon="icon" />
              Contact Me
            </a>
          </li>
        </ul>
      </footer>
    </article>
  </section>
</template>

<script>
  import PanelTitle from '@/components/PanelTitle';
  import AnimatedCode from '@/components/AnimatedCode';
  import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
  import faArrowDown from '@fortawesome/fontawesome-free-solid/faArrowDown';
  import panelMixin from '@/mixins/panel-mixin';

  export default {
    name:       'experience',
    mixins:     [panelMixin],
    components: {
      PanelTitle,
      AnimatedCode,
      FontAwesomeIcon,
    },
    data() {
      return {
        dir:       'left',
        title:     'My Experience',
        years:     9,
        stars:     500,
        downloads: 1000,
        icon:      faArrowDown,
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

  mark {
    background-color: fade-out($color-pink, 0.1);
  }
</style>
