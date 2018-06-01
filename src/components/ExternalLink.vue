<template>
  <a
    :href="href"
    :title="titleText"
    target="_blank"
    rel="noopener noreferrer"
  ><slot></slot></a>
</template>

<script>
  export default {
    name:  'external-link',
    props: {
      href: {
        type:    String,
        require: true,
      },
      title: {
        type:    String,
        default: '',
      },
    },
    computed: {
      titleText() {
        return this.title || this.$slots.default[0].text;
      },
    },
    // data() {
    //   return {
    //     title: '',
    //   };
    // },
    // beforeMount() {
    //   this.title = this.$slots.default[0].text;
    // },
  };
</script>
