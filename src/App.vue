<template>
  <div id="main" class="app">
    <h1>Header h1</h1>
    <h2>Header h2</h2>
    <h3>Header h3</h3>
    <h4>Header h4</h4>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vestibulum sodales nibh, in sollicitudin tortor facilisis id. Nullam vel eleifend neque. Duis eu ipsum feugiat, tristique risus non, tincidunt ante. Aenean quis elit a dolor mattis molestie nec nec metus. Nulla ipsum magna, pulvinar a sodales nec, porttitor sit amet risus. Maecenas iaculis pellentesque ligula vel maximus. Donec ac odio at tortor interdum vulputate semper vel elit. Mauris quis ligula dapibus, molestie ante sit amet, viverra justo.</p>
    <p><a href="#">Praesent vitae lorem vitae nibh semper pellentesque ut vitae magna</a>.</p>
    <p><i>Phasellus interdum non mauris a tempor. Duis dapibus ac sapien in finibus.</i></p>
    <p><strong>Etiam tincidunt justo vel enim iaculis iaculis.</strong></p>
    <p><button class="button">Button</button></p>
    <p><a href="#" class="button">Link Button</a></p>
    <p><button class="button--pink">Pink Button</button></p>
    <p><button class="button--purple">Purple Button</button></p>
    <p><button class="button__ghost">Button Ghost</button></p>
    <p><button class="button__ghost--white">White Button Ghost</button></p>
    <p>
      <label for="">Label</label>
      <input type="text" placeholder="Input">
    </p>
    <p>
      <input type="checbox">
      <input type="checbox">
    </p>
    <p>
      <input type="radio">
      <input type="radio">
    </p>
    <p>
      <textarea>Textarea</textarea>
    </p>
    <p>
      <select>
        <option value="">-- Select --</option>
        <option value="">Option</option>
        <option value="">Option</option>
        <option value="">Option</option>
      </select>
    </p>
  </div>
</template>

<script>
  export default {
    name: 'app',
    mounted() {
      // eslint-disable-next-line
      console.log('howdy');
    },
  };
</script>

<style lang="scss">
  @import 'assets/styles/global';
</style>
