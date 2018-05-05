<template>
  <header>
    <h2 class="panel-title" :class="classObject">{{title}}</h2>
  </header>
</template>

<script>
  export default {
    name:  'panel-title',
    props: {
      title: String,
      dir:   {
        type:    String,
        default: 'left',
        validator(value) {
          return ['left', 'right'].includes(value);
        },
      },
      color: {
        type:    String,
        default: '',
      },
    },
    computed: {
      classObject() {
        const output = {};
        output[this.dir] = this.dir;
        output[this.color] = !!this.color;
        return output;
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import 'src/assets/styles/lib/vars';

  header {
    margin-bottom: 4rem;
  }

  .panel-title {
    text-transform: uppercase;
    letter-spacing: 4px;
  }

  .right {
    text-align: right;
  }

  .pink {
    color: $color-pink;
  }

  .purple {
    color: $color-purple;
  }
</style>
