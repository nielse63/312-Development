<template>
  <div id="social-media" class="panel social-media">
    <article class="container">
      <panel-title
        :title="title"
      ></panel-title>
      <ul>
        <li v-for="link in links" :key="link.href">
          <a :href="link.href" target="_blank">
            <lazy-load-image :src="link.image.src" :alt="link.image.alt"></lazy-load-image>
            <p>{{link.content}}</p>
          </a>
        </li>
      </ul>
    </article>
  </div>
</template>

<script>
  import PanelTitle from '@/components/PanelTitle';
  import LazyLoadImage from '@/components/LazyLoadImage';
  import trianglify from '@/assets/images/trianglify.svg';
  import github from '@/assets/images/github.svg';
  import npm from '@/assets/images/npm.svg';
  import medium from '@/assets/images/medium.svg';
  import twitter from '@/assets/images/twitter.svg';
  import linkedin from '@/assets/images/linkedin.svg';
  import instagram from '@/assets/images/instagram.svg';

  export default {
    name:       'social-media',
    components: {
      PanelTitle,
      LazyLoadImage,
    },
    data() {
      return {
        title: 'Stay Connected',
        links: [
          {
            image: {
              src: github,
              alt: 'GitHub',
            },
            content: 'My GitHub profile is a good place to check my open-source projects',
            href:    'https://github.com/nielse63',
          },
          {
            image: {
              src: npm,
              alt: 'NPM',
            },
            content: 'I\'ll typically submit my work to NPM as well',
            href:    'https://npmjs.org/~nielse63',
          },
          {
            image: {
              src: medium,
              alt: 'Medium',
            },
            content: 'My bookmarks on Medium will give you a good idea of what I\'m learning in my free time',
            href:    'https://medium.com/@ErikKyleNielsen',
          },
          {
            image: {
              src: twitter,
              alt: 'Twitter',
            },
            content: 'I tweet - a lot. Mostly industry stuff, sometimes pictures of my dog',
            href:    'https://twitter.com/erikkylenielsen',
          },
          {
            image: {
              src: linkedin,
              alt: 'LinkedIn',
            },
            content: 'I don\'t keep my LinkedIn profile as up to date as I should, but feel free to check out my endorsements anyway',
            href:    'https://www.linkedin.com/in/erikkylenielsen/',
          },
          {
            image: {
              src: instagram,
              alt: 'Instagram',
            },
            content: 'If you want to see a more human side of me, check out my Instagram account',
            href:    'https://instagram.com/nielse63',
          },
        ],
      };
    },
    mounted() {
      this.$el.style.cssText = `background-image: url(${trianglify});`;
    },
  };
</script>

<style lang="scss" scoped>
  @import 'src/assets/styles/lib/vars';

  .social-media {
    font-size: 16px;
    line-height: 1.5;
    background-size: cover;
  }

  ul {
    display: flex;
    flex-wrap: wrap;
  }

  li {
    width: percentage(1 / 3);
    margin: 0;

    &:nth-child(3n) {
      ~ li {
        margin-top: 2rem;
      }
    }
  }

  a {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem;
    height: 100%;
    border-bottom: 2px solid transparent;
    overflow: hidden;

    &:after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: $color-pink;
      transform: translate(-100%, 0);
      transition: transform ($transition-duration * 2);
    }

    &,
    &:hover,
    &:active,
    &:focus {
      color: $color-black;
    }

    &:hover,
    &:active,
    &:focus {
      &:after {
        transform: translate(0, 0);
      }
    }
  }

  img {
    width: 65px;
  }

  p {
    padding-left: 1em;
    margin: 0;
  }
</style>
