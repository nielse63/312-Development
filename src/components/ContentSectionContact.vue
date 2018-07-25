<template>
  <content-section title="Contact Me">
    <article>
      <app-loading v-if="loading"></app-loading>
      <form novalidate="true" autocomplete="false" @submit.prevent="onsubmit">
        <form-input label="Name" :value="entry.name" @input="entry.name = $event"></form-input>
        <form-input label="Email" type="email" :value="entry.email" @input="entry.email = $event"></form-input>
        <form-input label="Company/Organization" type="text" :value="entry.company" @input="entry.company = $event"></form-input>
        <form-input label="URL" type="url" :value="entry.url" @input="entry.url = $event"></form-input>
        <form-input label="Message" type="textarea" class="wide"></form-input>
        <div class="wide"><button type="submit">Submit</button></div>
      </form>
    </article>
  </content-section>
</template>

<script>
import ContentSection from '@/components/ContentSection';
import FormInput from '@/components/FormInput';
import AppLoading from '@/components/AppLoading';

export default {
  name:       'ContentSectionContact',
  components: {
    ContentSection,
    AppLoading,
    FormInput,
  },
  data() {
    return {
      loading: false,
      entry:   {
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
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 1500);
    },
  },
};
</script>

<style scoped lang="scss">
@import "../assets/styles/lib/mixins";
@import "../assets/styles/lib/vars";

.content-section {
  display: block;

  &:before {
    content: "";
    @include size(100%);
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    background-image: linear-gradient(to bottom, #00b870, #11eb96);
    clip-path: polygon(70% 0%, 100% 0%, 100% 100%, 25% 100%);
  }
}

article {
  padding-top: 0;
  color: $color-black;
}

form {
  @include basic-content-transform;
  transition-delay: 0.25s;
}
</style>
