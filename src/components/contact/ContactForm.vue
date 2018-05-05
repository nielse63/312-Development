<template>
  <div class="contact-form">
    <p>
      <label for="name">Your Name</label>
      <input type="text" id="name" placeholder="Name" v-model="name" :disabled="submitting">
    </p>
    <p>
      <label for="email">Your Email Address</label>
      <input type="email" id="email" placeholder="Email" v-model="email" :disabled="submitting">
    </p>
    <p>
      <label for="message">Your Message</label>
      <textarea id="message" v-model="message" :disabled="submitting"></textarea>
    </p>
    <p>
      <template v-if="submitting">
        <button type="submit" disabled>
          <font-awesome-icon :icon="icon" spin />
          Submitting...
        </button>
      </template>
      <template v-else>
        <button type="submit" @click="submit">Submit</button>
      </template>
    </p>
  </div>
</template>

<script>
  import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
  import faCog from '@fortawesome/fontawesome-free-solid/faCog';

  export default {
    name:       'contact-form',
    components: {
      FontAwesomeIcon,
    },
    data() {
      return {
        name:       '',
        email:      '',
        message:    '',
        submitting: false,
        icon:       faCog,
      };
    },
    methods: {
      submit() {
        /* eslint-disable no-console */
        this.submitting = true;
        console.log('submitting...');
        console.log({
          name:    this.name,
          email:   this.email,
          message: this.message,
        });
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import 'src/assets/styles/lib/vars';

  input,
  textarea {
    display: block;
    width: 100%;
  }

  label {
    display: block;
  }

  .contact-form {
    // ...
  }
</style>
