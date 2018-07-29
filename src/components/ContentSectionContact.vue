<template>
  <content-section title="Contact Me" @inview="inview">
    <article>
      <form
        :class="cls"
        autocomplete="false"
        novalidate="novalidate"
        @submit.prevent="onsubmit"
      >
        <form-input
          label="Name"
          autocomplete="name"
        ></form-input>
        <form-input
          label="Email"
          type="email"
          autocomplete="email"
        ></form-input>
        <form-input
          label="Company/Organization"
          type="text"
          name="organization"
          autocomplete="organization"
        ></form-input>
        <form-input
          label="URL"
          type="url"
        ></form-input>
        <form-input
          label="Message"
          type="textarea"
          @input="entry.message = $event"
        ></form-input>
        <form-submit></form-submit>
      </form>
    </article>
  </content-section>
</template>

<script>
import anime from 'animejs';
import { mapState, mapActions } from 'vuex';
import ContentSection from '@/components/ContentSection';
import FormInput from '@/components/FormInput';
import FormSubmit from '@/components/FormSubmit';

export default {
  name:       'ContentSectionContact',
  components: {
    ContentSection,
    FormInput,
    FormSubmit,
  },
  data() {
    return {
      submitting: false,
    };
  },
  computed: {
    ...mapState('message', ['invalid', 'submitError']),
    cls() {
      return {
        form:     true,
        disabled: this.submitting,
      };
    },
  },
  methods: {
    ...mapActions('message', ['validate', 'submit']),
    async onsubmit() {
      this.validate();
      if (this.invalid) {
        return;
      }
      this.submitting = true;
      this.$dispatcher.$emit('submitting');
      await this.submit();
      this.$dispatcher.$emit('complete', this.submitError);
      this.submitting = false;
    },
    animateInputs() {
      return anime({
        targets: this.$el.querySelectorAll('.form-input'),
        opacity: 1,
        translateY() {
          return [`${anime.random(50, 75)}vh`, '0vh'];
        },
        duration: 1000,
        easing:   'easeOutElastic',
        delay(el, i) {
          return (i * anime.random(0, 50)) + 200;
        },
        elasticity() {
          return anime.random(100, 250);
        },
        autoplay: true,
      });
    },
    inview() {
      this.animateInputs();
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
    background-image: $gradient-green;
    clip-path: polygon(70% 0%, 100% 0%, 100% 100%, 25% 100%);
  }
}

article {
  padding-top: 0;
  color: $color-black;
}

form {
  transition-delay: 0.25s;
}

// .disabled {
//   .form-input {
//     opacity: 0.5 !important;
//     pointer-events: none;
//   }
// }

// .errors {
//   margin: 2rem 0 0;
//   padding: 1rem;
//   font-weight: 700;
//   font-size: 14px;
//   background-color: $color-orange-dark;
//   color: $color-white;
// }

// .button {
//   margin-top: 2rem;
// }

// .submitting {
//   cursor: not-allowed;
// }

// button {
//   // background: linear-gradient(#de6cff, #bc41df);
//   background: transparent;
//   // color: $color-white;
//   color: $color-blue-dark;
//   // border: 0;
//   border: 2px solid $color-blue-dark;
//   border-radius: 2px;
//   font-weight: 700;
//   font-size: 0.8em;
//   text-transform: uppercase;
//   letter-spacing: 1px;
//   line-height: 1.5;
//   padding: 0.5em 2em;
//   cursor: pointer;
//   display: block;
//   transition: 0.1s background-color ease-in-out;

//   &:hover {
//     background-color: fade-out($color-blue-dark, 0.75);
//   }

//   &[disabled] {
//     pointer-events: none;
//   }
// }
</style>
