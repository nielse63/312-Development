<template>
  <footer class="footer" :style="style">
    <link rel="preload" :href="image" as="image">
    <ul class="footer__links">
      <li v-for="link in links" :key="link.text">
        <external-link :text="link.text" :href="link.href">
          <span v-html="link.icon"></span>
          {{link.text}}
        </external-link>
      </li>
    </ul>
  </footer>
</template>

<script>
import { links } from '@/lib/content';
import BackgroundImage from '@/assets/images/trianglify.png';
import ExternalLink from '@/components/ExternalLink';
import GithubIcon from '@/assets/images/github.svg';
import LinkedInIcon from '@/assets/images/linkedin.svg';
import TwitterIcon from '@/assets/images/twitter.svg';
import NPMIcon from '@/assets/images/npm.svg';

export default {
  name:       'AppFooter',
  components: {
    ExternalLink,
  },
  data() {
    return {
      image: BackgroundImage,
      links: [
        {
          text: 'GitHub',
          href: links.github,
          icon: GithubIcon,
        }, {
          text: 'NPM',
          href: links.npm,
          icon: NPMIcon,
        }, {
          text: 'Twitter',
          href: links.twitter,
          icon: TwitterIcon,
        }, {
          text: 'LinkedIn',
          href: links.linkedin,
          icon: LinkedInIcon,
        },
      ],
    };
  },
  computed: {
    style() {
      if (!this.image) {
        return {};
      }
      return {
        backgroundImage: `url(${this.image})`,
      };
    },
  },
};
</script>

<style scoped lang="scss">
@import "../assets/styles/lib/vars";
@import "../assets/styles/lib/mixins";

.footer {
  padding: 2rem 0;
  color: $color-white;
  font-size: 22px;
  letter-spacing: 1px;
  background-image: radial-gradient( circle farthest-corner at 41.5% 52.8%,  rgba(0,133,195,1) 0%, rgba(0,108,159,1) 87.3% );
  background-color: $color-blue;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

ul {
  display: flex;
  justify-content: center;
  align-items: center;
}

li {
  margin: 0 1em;
}

a {
  display: flex;
  padding: 0.25em;
  transition: 0.15s background-color ease-in-out;

  &:hover {
    background-color: fade-out($color-white, 0.8);
  }
}

span {
  @include size(1em);
  display: inline-block;
  margin-right: 0.5em;
}
</style>
