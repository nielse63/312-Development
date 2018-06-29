<template>
  <button class="app-navigation-button" :class="{ open: isOpen }" @click="onclick">
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
    isNavOpen: {
      type:    Boolean,
      default: false,
    },
  },
  data() {
    return {
      isOpen: false,
    };
  },
  watch: {
    isNavOpen(newValue) {
      this.isOpen = newValue;
    },
  },
  methods: {
    onclick() {
      this.isOpen = !this.isOpen;
      this.$emit('toggle', this.isOpen);
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

.app-navigation-button {
  cursor: pointer;
  background: none;
  border: 0;
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 3;
  width: $button-width;
  height: $button-height;
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

  &:nth-child(1) {
    top: $top-bar-top;
  }

  &:nth-child(2),
  &:nth-child(3) {
    top: $middle-bar-top;
  }

  &:nth-child(4) {
    top: $bottom-bar-top;
  }
}

.open {
  span {
    background-color: $color-black;

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
