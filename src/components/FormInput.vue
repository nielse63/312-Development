<template>
  <div :class="cls">
    <label :for="name">{{label}}</label>
    <div class="wrapper" :data-error="error" v-if="type == 'textarea'">
      <textarea
        :name="name"
        :id="name"
        @blur="blur"
      ></textarea>
    </div>
    <div class="wrapper" :data-error="error" v-else>
      <input
        :type="type"
        :name="name"
        :id="name"
        :autocomplete="autocomplete"
        @blur="blur"
      >
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name:  'FormInput',
  props: {
    label: {
      type:     String,
      required: true,
    },
    name: {
      type: String,
      default() {
        return this.label
          .toLowerCase()
          .replace(/\//g, '-')
          .replace(/\b/g, '');
      },
    },
    type: {
      type:    String,
      default: 'text',
    },
    autocomplete: {
      type:    String,
      default: '',
    },
  },
  computed: {
    ...mapState('message', ['errors']),
    error() {
      return this.errors[this.name];
    },
    cls() {
      return {
        'form-input': true,
        error:        !!this.error,
      };
    },
  },
  methods: {
    ...mapActions('message', ['setValue']),
    blur({ target }) {
      const { value } = target;
      this.setValue({ name: this.name, value });
    },
  },
};
</script>

<style scoped lang="scss">
@import "../assets/styles/lib/vars";

.form-input {
  opacity: 0;

  & + & {
    margin-top: 1rem;
  }
}

.wrapper {
  position: relative;
  background-color: $color-white;

  &:after {
    content: attr(data-error);
    position: absolute;
    top: 50%;
    right: 0.5rem;
    transform: translate(0, -50%);
    color: $color-red;
    font-weight: 700;
    font-size: 0.7em;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
}

label,
input,
textarea {
  display: block;
  width: 100%;
}

label {
  font-weight: 700;
  font-size: 0.8em;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
}

input,
textarea {
  border: 1px solid $border-color;
  padding: 0.5em;
  line-height: 1.5;
}

textarea {
  min-height: 150px;
}

.error {
  animation: shake 0.35s;

  label {
    color: $color-red;
  }

  input,
  textarea {
    border-color: $color-red;
  }
}
</style>
