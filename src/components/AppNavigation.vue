<template>
  <nav class="app-navigation">
    <ul>
      <li>
        <router-link to="/">Home</router-link>
      </li>
      <li>
        <router-link to="/about-me">About Me</router-link>
      </li>
      <li>
        <router-link to="/experience">Experience</router-link>
      </li>
      <li>
        <router-link to="/portfolio">Portfolio</router-link>
      </li>
      <li>
        <router-link to="/contact">Contact Me</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'AppNavigation',
};
</script>

<style scoped lang="scss">
@import '../assets/styles/lib/vars';

.app-navigation {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  padding: 2rem 1rem;
  background-color: $color-white;
}

a {
  color: $color-black;
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 4px;
  font-size: 14px;
}
</style>
