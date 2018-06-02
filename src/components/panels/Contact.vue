<template>
  <section id="contact" class="contact panel" :class="classObject">
    <article class="container">
      <panel-title
        :title="title"
        color="pink"
      ></panel-title>
      <div class="content--wide">
        <contact-form></contact-form>
      </div>
    </article>
  </section>
</template>

<script>
  import PanelTitle from '@/components/PanelTitle';
  import ContactForm from '@/components/ContactForm';
  import panelMixin from '@/mixins/panel-mixin';

  export default {
    name:       'contact',
    mixins:     [panelMixin],
    components: {
      PanelTitle,
      ContactForm,
    },
    data() {
      return {
        title: 'Contact Me',
      };
    },
  };
</script>

<style lang="scss" scoped>
  @import 'src/assets/styles/lib/vars';

  .contact {
    color: $color-white;
    background-color: $color-black;

    &:before {
      opacity: 0.5;
    }
  }

  .content--wide {
    width: 60%;
    margin: 0 auto;
  }
</style>
