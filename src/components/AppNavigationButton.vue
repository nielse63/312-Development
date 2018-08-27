<template>
  <button
    class="app-navigation-button"
    :class="buttonClass"
    role="presentation"
    aria-label="Open Navigation"
    @click="onclick"
  >
    <span></span>
    <span></span>
    <span></span>
    <span></span>
  </button>
</template>

<script>
export default {
  name:  'AppNavigationButton',
  props: {
    open: {
      type:    Boolean,
      default: false,
    },
  },
  computed: {
    buttonClass() {
      return {
        'button-open': this.open,
      };
    },
  },
  methods: {
    onclick() {
      this.$emit('navtoggle');
    },
  },
};
</script>

<style scoped lang="scss">
@import "../assets/styles/lib/vars";

$button-width: 40px;
$button-height: 34px;

$bar-height: 6px;
$top-bar-top: 0;
$bottom-bar-top: ($button-height - $bar-height);
$middle-bar-top: ($bottom-bar-top / 2);

.app {
  background-color: $color-black;
}

.app-navigation-button {
  cursor: pointer;
  background: none;
  border: 0;
  position: fixed;
  top: 1rem;
  right: 1rem;
  width: $button-width;
  height: $button-height;
  z-index: 2;
}

span {
  display: block;
  position: absolute;
  height: $bar-height;
  width: 100%;
  background: $color-white;
  border-radius: 9px;
  opacity: 1;
  left: 0;
  transform: rotate(0deg);
  transition: 0.25s ease-in-out;
  box-shadow: 0 0 1px $color-black;

  &:nth-child(1) {
    top: $top-bar-top;
  }

  &:nth-child(2),
  &:nth-child(3) {
    top: $middle-bar-top;
  }

  &:nth-child(3) {
    box-shadow: none;
  }

  &:nth-child(4) {
    top: $bottom-bar-top;
  }
}

.button-open {
  span {
    box-shadow: none;
    background: $color-black;

    &:nth-child(1),
    &:nth-child(4) {
      top: $middle-bar-top;
      width: 0%;
      left: 50%;
    }

    &:nth-child(2) {
      transform: rotate(45deg);
    }

    &:nth-child(3) {
      transform: rotate(-45deg);
    }
  }
}
</style>
