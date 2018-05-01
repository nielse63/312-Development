<template>
  <div class="row">
    <div class="col" v-bind:class="classes">
      <label :for="inputName" :id="inputName">{{name | titlize}}</label>
      <template v-if="type !== 'textarea'">
        <input
          :name="inputName"
          :type="type"
          :aria-labelledby="inputName"
          :autocomplete="autocomplete"
          v-on:blur="onblur"
        >
      </template>
      <template v-else>
        <textarea :name="inputName" v-on:blur="onblur" :aria-labelledby="inputName"></textarea>
      </template>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'input-col',
    props: {
      name: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        default: 'text',
      },
      autocomplete: {
        type: String,
        default: '',
      },
    },
    data() {
      return {
        valid: true,
        value: '',
      };
    },
    computed: {
      needsValidation() {
        return !['text', 'textarea'].includes(this.type);
      },
      classes() {
        return {
          invalid: !this.valid,
        };
      },
      inputName() {
        return this.name.toString().kebabCase();
      },
    },
    filters: {
      titlize(value = '') {
        return `Your ${value.toString().titleCase()}`;
      },
    },
    methods: {
      isEmailValid(value) {
        return value && /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(value);
      },
      onblur(e) {
        this.value = e.target.value;
        if (!this.value) {
          this.valid = false;
        } else if (this.needsValidation) {
          this.valid = this.isEmailValid(this.value);
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import '../../assets/styles/main';

  label {
    font-weight: 700;
    font-size: 12px;
    text-transform: uppercase;
    display: block;
    letter-spacing: 2px;

    + * {
      margin-top: 0.25em;
    }
  }

  input,
  textarea {
    border: 1px solid $border-color;
    padding: 0.5em;
    font-size: 1rem;
    line-height: 1.5;
    display: block;
    width: 100%;
    border-radius: 0;
    appearance: none;
  }

  textarea {
    height: 150px;
  }

  .col {
    @include flex-item(100%);
  }

  .required {
    font-weight: 700;
    color: $color-red;
  }

  .invalid {
    color: $color-red;

    input,
    textarea {
      border-color: $color-red;
    }
  }
</style>
