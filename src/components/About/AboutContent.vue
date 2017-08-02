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
    $panel-font-size: 20px;
    $link-color: lighten($color-pink, 15%);
    $link-color-hover: $color-pink;

    font-size: $panel-font-size;
    line-height: 2;

    a {
      $after-height: ($panel-font-size / 8);
      $after-height-hover: ($after-height + 2px);

      $link-color: lighten($color-pink, 15%);
      $link-color-hover: $color-pink;

      color: $color-pink;
      font-weight: 700;
      position: relative;
      transition: color $link-transition-duration;

      &:hover {
        color: $color-pink;
      }

      &:after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: $after-height;
        background-color: $link-color;
        transition: height $link-transition-duration,
        background-color $link-transition-duration;
      }

      &:hover {
        &:after {
          height: $after-height-hover;
          background-color: $link-color-hover;
        }
      }
    }
  }
</style>
