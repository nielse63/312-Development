<template>
  <div :class="cls">
    <div class="inner">
      <router-link :to="href">
        <h3>{{title}}</h3>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name:  'FloatingBox',
  props: {
    title: {
      type: String,
    },
    text: {
      type: String,
    },
    href: {
      type: String,
    },
    color: {
      type: String,
    },
  },
  computed: {
    cls() {
      const output = {
        'floating-box': true,
      };
      output[this.color] = true;
      return output;
    },
  },
};
</script>

<style scoped lang="scss">
@import "../assets/styles/lib/vars";
@import "../assets/styles/lib/mixins";

@mixin link($color) {
  a {
    &:before {
      border-color: $color;
    }

    &:hover {
      &:before {
        background-color: $color;
      }
    }
  }
}

.floating-box {
  flex: 1;
  position: relative;

  &:before {
    content: "";
    display: block;
    padding-top: 100%;
  }
}

.inner {
  position: absolute;
  top: 0;
  left: 0;
  @include size(100%);
}

h3 {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 2rem;
  font-weight: 400;
  font-family: $font-family-sans-serif;
}

a {
  display: block;
  height: 100%;
  position: relative;
  will-change: color;
  transition: color 0.35s cubic-bezier(0.65, 0, 0.35,1);

  &:before {
    @include size(80%);
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 10px solid $color-pink;
    border-radius: 50%;
    will-change: border-radius, height, background-color;
    transition: all 0.35s cubic-bezier(0.65, 0, 0.35,1);
  }

  &:hover {
    color: $color-white;

    &:before {
      border-radius: 0;
      height: 35%;
      background-color: $color-pink;
    }
  }
}

.pink {
  @include link($color-pink);
}

.blue {
  @include link($color-blue);
}

.purple {
  @include link($color-purple);
}

.green {
  @include link($color-green);
}
</style>
