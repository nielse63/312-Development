<template>
  <div class="contact">
    <intro-panel
      :title="title"
      :canvas="canvas"
    ></intro-panel>
    <content-section>
      <content-panel>
        <form novalidate="true" autocomplete="false" @submit.prevent="onsubmit">
          <form-input label="Name" :value="entry.name" @input="entry.name = $event"></form-input>
          <form-input label="Email" type="email" :value="entry.email" @input="entry.email = $event"></form-input>
          <form-input label="Company/Organization" type="text" :value="entry.company" @input="entry.company = $event"></form-input>
          <form-input label="URL" type="url" :value="entry.url" @input="entry.url = $event"></form-input>
          <form-input label="Message" type="textarea" class="wide"></form-input>
          <div class="wide"><button type="submit">Submit</button></div>
        </form>
      </content-panel>
    </content-section>
  </div>
</template>

<script>
import canvas from '@/lib/canvas/cubes';
import IntroPanel from '@/components/IntroPanel';
import ContentSection from '@/components/ContentSection';
import ContentPanel from '@/components/ContentPanel';
import FormInput from '@/components/FormInput';

export default {
  name:       'Contact',
  components: {
    IntroPanel,
    ContentSection,
    ContentPanel,
    FormInput,
  },
  data() {
    return {
      canvas,
      title: 'Contact Me',
      entry: {
        name:    '',
        email:   '',
        company: '',
        url:     '',
        message: '',
      },
    };
  },
  methods: {
    onsubmit() {
      // submit form
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/lib/vars";

.content-section {
  &:before {
    background: linear-gradient(to bottom, #0f1617, transparent);
  }
}

form {
  display: flex;
  flex-wrap: wrap;

  > * {
    flex: 1 0 50%;
    padding: 1em;
  }
}

.wide {
  flex: 1 0 100%;
}

button {
  background-color: $color-blue;
  color: $color-white;
  border: 2px solid $color-blue;
  border-radius: 2px;
  font-weight: 700;
  font-size: 0.8em;
  text-transform: uppercase;
  letter-spacing: 1px;
  line-height: 1.5;
  padding: 0.5em 2em;
  cursor: pointer;
  display: block;
}
</style>
