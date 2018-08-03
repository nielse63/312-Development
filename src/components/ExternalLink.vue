<template>
  <a
    :href="this.href"
    :title="this.text"
    target="_blank"
    rel="noopener noreferrer"
  ><slot></slot></a>
</template>

<script>
export default {
  name:  'ExternalLink',
  props: {
    href: {
      type:    String,
      require: true,
    },
    text: {
      type:    String,
      require: true,
    },
  },
};
</script>
