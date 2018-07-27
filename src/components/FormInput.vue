<template>
  <div class="form-input">
    <label :for="name">{{label}}</label>
    <template v-if="type == 'textarea'">
      <textarea
        :name="name"
        :id="name"
        :value="value"
        @input="$emit('input', $event.target.value)"
        v-validate.initial="rules"
      ></textarea>
    </template>
    <template v-else>
      <input
        :type="type"
        :name="name"
        :id="name"
        :value="value"
        :autocomplete="autocomplete"
        @input="$emit('input', $event.target.value)"
        v-validate.initial="rules"
      >
    </template>
  </div>
</template>

<script>
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
    value: {
      type:    String,
      default: '',
    },
    autocomplete: {
      type:    String,
      default: '',
    },
  },
  computed: {
    rules() {
      return {
        required: true,
        email:    this.type === 'email',
        url:      this.type === 'url',
      };
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
}

input,
textarea {
  border: 1px solid $border-color;
  padding: 0.5em 0.25em;
  line-height: 1.5;
}

textarea {
  min-height: 150px;
}
</style>
