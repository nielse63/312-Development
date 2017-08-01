<template>
  <a
    :href="this.href"
    :title="this.text"
    target="_blank"
    rel="noopener noreferrer"
  >{{this.text}}</a>
</template>

<script>
  export default {
    name: 'external-link',
    props: {
      href: {
        type: String,
        require: true,
      },
      text: {
        type: String,
        require: true,
      },
    },
  };
</script>
