<template>
  <footer class="footer">
    <ul class="footer__links">
      <li v-for="link in links" :key="link.text">
        <external-link :title="link.text" :href="link.href">
          <span v-html="link.icon"></span>
          {{link.text}}
        </external-link>
      </li>
    </ul>
  </footer>
</template>

<script>
import { links } from '@/lib/content';
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
  background-image: linear-gradient(to bottom, #00588f, #0c96c0);
}

ul {
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: $mobile-width-max) {
    flex-direction: column;
  }
}

li {
  margin: 0 0.5em;
}

a {
  display: flex;
  padding: 0.25em 0.5em;
  line-height: 1;
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
