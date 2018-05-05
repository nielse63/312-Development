<template>
  <section id="experience" class="experience panel" :class="dir">
    <article class="container">
      <panel-title
        :title="title"
        :dir="dir"
      ></panel-title>
      <div class="content">
        <p>{{content}}</p>
      </div>
    </article>
  </section>
</template>

<script>
  import PanelTitle from '@/components/PanelTitle';

  export default {
    name:       'experience',
    components: {
      PanelTitle,
    },
    data() {
      return {
        dir:     'right',
        title:   'My Experience/CV',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam in nunc sollicitudin, suscipit ante id, vehicula neque. Aliquam porttitor, nibh vitae viverra vehicula, enim ex malesuada quam, rhoncus hendrerit quam velit quis magna. Mauris at felis eget est venenatis feugiat eu et nunc. Pellentesque nec libero accumsan odio euismod eleifend. Ut sodales ipsum nulla. Aenean tempor sem augue, ac pulvinar orci porta aliquam. Nam viverra lorem ac ipsum tempus, non imperdiet ex fringilla. Morbi eget consequat sem.',
      };
    },
  };
</script>

<style lang="scss" scoped>
  @import 'src/assets/styles/lib/vars';

  .experience {
    color: $color-white;
    background-color: $color-blue;
  }
</style>
