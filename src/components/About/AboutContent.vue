<template>
  <div class="panel__content about-me">
    <p>I’m Erik Nielsen, a User-Interface and Full-Stack Software Engineer from Chicago, Illinois. I’ve been in the industry for over 8 years, and work with the fine folks at <external-link href="https://www.enova.com/" text="Enova International" />.</p>
    <p>To learn more about me you can always <a href="mailto:erik@312development.com">email me</a>. And make sure you <external-link href="https://twitter.com/intent/follow?screen_name=erikkylenielsen" text="follow me on Twitter" /> to get the latest JavaScript news, articles, and resources.</p>
  </div>
</template>

<script>
  import ExternalLink from '@/components/ExternalLink';

  export default {
    name: 'about-content',
    components: {
      ExternalLink,
    },
  };
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/main";

  .about-me {
    font-size: 20px;
    line-height: 2;

    a {
      color: $color-pink;
      font-weight: 700;
      position: relative;

      &:after {
        content: "";
        position: absolute;
        top: 0;
        left: -0.15em;
        right: -0.15em;
        height: 100%;
        background-color: fade-out($color-pink, 1);
        transition: background-color $link-transition-duration,
      }

      &:hover,
      &:active,
      &:focus {
        &:after {
          background-color: fade-out($color-pink, 0.85);
        }
      }
    }
  }
</style>
