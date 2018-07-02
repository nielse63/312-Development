<template>
  <div class="contact">
    <intro-panel
      :title="title"
      :canvas="canvas"
    ></intro-panel>
    <content-section>
      <content-panel :narrow="narrow">
        <form-input label="Name"></form-input>
        <form-input label="Email" type="email"></form-input>
        <form-input label="Message" type="textarea"></form-input>
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
      title:  'Contact Me',
      narrow: true,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/lib/vars";
</style>
