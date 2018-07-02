<template>
  <div class="form-input">
    <template v-if="type == 'textarea'">
      <textarea></textarea>
    </template>
    <template v-else>
      <input :type="type">
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
    placeholder: {
      type: String,
    },
  },
};
</script>

<style scoped lang="scss">
@import "../assets/styles/lib/vars";
</style>
