<template>
  <section id="process" class="panel panel--triangles process" :class="classObject">
    <article class="container">
      <panel-title
        :title="title"
        color="pink"
      ></panel-title>
      <div class="content">
        <blockquote>
          Michael always says 'K-I-S-S. Keep it simple, stupid.' Great advice. Hurts my feelings every time.
          <cite>Dright Schrute</cite>
        </blockquote>
        <p>The one thing I always try to do in my work is to <mark>keep it as simple as possible</mark>. Early in my career I found myself creating solutions that were fancier than need be - needlessly creating a complex solution just because I could. But that didn't make the code more readable; it didn't help my team members, and din't help drive the project toward completion.</p>
        <p>This paradigm applies to all facets of my job - whether it's writing code, improving team communication, or creating a new standard/styleguide. The aim is always to keep it simple and easy; <mark>creating a complex solution doesn't solve the problem</mark>.</p>
      </div>
    </article>
  </section>
</template>

<script>
  import PanelTitle from '@/components/PanelTitle';
  import panelMixin from '@/mixins/panel-mixin';

  export default {
    name:       'process',
    mixins:     [panelMixin],
    components: {
      PanelTitle,
    },
    data() {
      return {
        dir:   'left',
        title: 'My Process/Philosophy',
      };
    },
  };
</script>

<style lang="scss" scoped>
  @import 'src/assets/styles/lib/vars';

  .process {
    background-color: $color-black;
    color: $color-white;

    &:before {
      opacity: 0.5;
    }
  }

  mark {
    background-color: $color-pink;
  }
</style>
