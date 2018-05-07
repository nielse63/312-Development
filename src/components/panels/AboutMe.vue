<template>
  <section id="about-me" class="panel about-me" :class="classObject">
    <article class="container">
      <panel-title
        :title="title"
        :dir="dir"
        color="purple"
      ></panel-title>
      <div class="content">
        <p>I'm a Senior User-Interface Software Engineer and Tech Lead in Chicago, currently creating great user experiences at <a href="#">Enova</a>. I’ve been in the industry for over {{years}} years, and my experience spans from Node to Ruby, and everything in between. <a href="#">Resume here</a>.</p>
        <p>Aside from writing code I'm an <a href="#">avid traveller</a>, triathlete and long-distance runner, and a huge fan of hiking/camping/fishing (anytning outdoors).</p>
      </div>
      <footer class="panel__footer">
        <p>
          <a href="#experience" class="button button--purple">
            <font-awesome-icon :icon="icon" />
            My Experience
          </a>
        </p>
      </footer>
    </article>
  </section>
</template>

<script>
  import PanelTitle from '@/components/PanelTitle';
  import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
  import faArrowDown from '@fortawesome/fontawesome-free-solid/faArrowDown';
  import panelMixin from '@/mixins/panel-mixin';

  export default {
    name:       'about-me',
    mixins:     [panelMixin],
    components: {
      PanelTitle,
      FontAwesomeIcon,
    },
    data() {
      return {
        dir:   'right',
        title: 'About Me',
        icon:  faArrowDown,
        years: 9,
      };
    },
  };
</script>

<style lang="scss" scoped>
  @import 'src/assets/styles/lib/vars';

  .about-me {
    background-color: $color-white;

    &:before {
      opacity: 0.5;
    }
  }
</style>
