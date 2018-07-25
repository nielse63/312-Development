<template>
  <div class="form-input">
    <label :for="name">{{label}}</label>
    <template v-if="type == 'textarea'">
      <textarea></textarea>
    </template>
    <template v-else>
      <input :type="type"
      :name="name" :id="name"
      :value="value" @input="$emit('input', $event.target.value)"
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
    type: {
      type:    String,
      default: 'text',
    },
    value: {
      type:    String,
      default: '',
    },
  },
  computed: {
    name() {
      return this.label.toLowerCase().replace(/\b/g, '');
    },
  },
};
</script>

<style scoped lang="scss">
@import "../assets/styles/lib/vars";

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
