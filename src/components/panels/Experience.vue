<template>
  <section id="experience" class="experience panel" :class="classObject">
    <animated-code></animated-code>
    <article class="container">
      <panel-title
        :title="title"
        :dir="dir"
      ></panel-title>
      <!-- <div class="content" v-html="content"></div> -->
      <div class="content">
        <p>I've been a <mark>software engineer for over {{years}} years</mark>, and my experience spans many different languages, libraries and frameworks. As a senior ui engineer, my responsibilities include curating and maintaining style guides and best practices shared across multiple teams; ensuring products are performant and accessible; and working with business, legal, and marketing to make sure our apps meet all company objectives. I do all this while introducing the latest technology and tools into our stack to stay modern.</p>
        <p>Outside of work, I create and contribute to <a href="https://github.com/nielse63" target="_blank">open source software</a> and frequently publish node modules to <a href="https://npmjs.org/~nielse63" target="_blank">NPM</a>. Collectively, my projects have received {{stars}} stars on GitHub and {{downloads}} downloads from NPM.</p>
      </div>
      <footer class="panel__footer">
        <h3>Get my Resume</h3>
        <ul class="inline-list">
          <li>
            <a :href="resume.link" target="_blank" class="button button__ghost--pink">View Online</a>
          </li>
          <li>
            <a :href="resume.pdf" target="_blank" class="button button__ghost--pink">Download PDF</a>
          </li>
          <li>
            <a :href="resume.docx" target="_blank" class="button button__ghost--pink">Download .docx</a>
          </li>
          <li>
            <a href="#contact" class="button button--pink">
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
  import content from '@/lib/content';
  import panelMixin from '@/mixins/panel-mixin';

  export default {
    name:       'experience',
    mixins:     [panelMixin],
    components: {
      PanelTitle,
      AnimatedCode,
      FontAwesomeIcon,
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
      // title: {
      //   type:     String,
      //   required: true,
      //   default:  '',
      // },
      // content: {
      //   type:     String,
      //   required: true,
      //   default:  '',
      // },
    },
    data() {
      return {
        // dir:       'left',
        // title:     'My Experience',
        years:     9,
        stars:     500,
        downloads: 1000,
        icon:      faArrowDown,
        resume:    content.resume,
      };
    },
    computed: {
      title() {
        return this.entry.title;
      },
      dir() {
        return this.entry.direction.toLowerCase();
      },
      content() {
        return this.entry.content;
      },
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
    // background-color: fade-out($color-pink, 0.1);
    // font-style: normal;
    // color: #fe628e;
    // position: relative;
    // color: $color-white;
    background-color: fade-out(#fe628e, 0.1);

    // &:before {
    //   content: '';
    //   background: #fe628e;
    //   transform: scale3d(1,1,1);
    //   position: absolute;
    //   z-index: -1;
    //   bottom: 0;
    //   left: 0;
    //   width: 100%;
    //   height: 50%;
    //   opacity: 0.9;
    //   transform-origin: 0% 50%;
    // }
  }
</style>
