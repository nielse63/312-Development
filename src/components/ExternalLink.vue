<template>
  <a
    :href="this.href"
    :title="this.title"
    target="_blank"
    rel="noopener noreferrer"
  ><slot></slot></a>
</template>

<script>
export default {
  name:  'ExternalLink',
  props: {
    href: {
      type:     String,
      required: true,
    },
    title: {
      type:     String,
      default:  '',
      required: true,
    },
  },
};
</script>
