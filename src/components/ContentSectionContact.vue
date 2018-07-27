<template>
  <content-section title="Contact Me" @inview="inview">
    <article>
      <form autocomplete="false" @submit.prevent="onsubmit">
        <form-input
          label="Name"
          autocomplete="name"
          @input="entry.name = $event"
        ></form-input>
        <form-input
          label="Email"
          type="email"
          autocomplete="email"
          @input="entry.email = $event"
        ></form-input>
        <form-input
          label="Company/Organization"
          type="text"
          name="organization"
          autocomplete="organization"
          @input="entry.company = $event"
        ></form-input>
        <form-input
          label="URL"
          type="url"
          @input="entry.url = $event"
        ></form-input>
        <form-input
          label="Message"
          type="textarea"
          @input="entry.message = $event"
        ></form-input>
        <div class="errors" v-if="errors.items.length">
          <p v-for="(error, i) in errors.items" :key="i">{{error.msg}}</p>
        </div>
        <div class="button">
          <button
            type="submit"
            :disabled="invalid"
            :aria-disabled="invalid"
          >Submit</button>
        </div>
      </form>
    </article>
  </content-section>
</template>

<script>
import anime from 'animejs';
import { mapActions } from 'vuex';
import ContentSection from '@/components/ContentSection';
import FormInput from '@/components/FormInput';

export default {
  name:       'ContentSectionContact',
  components: {
    ContentSection,
    FormInput,
  },
  data() {
    return {
      entry: {
        name:    '',
        email:   '',
        company: '',
        url:     '',
        message: '',
      },
    };
  },
  computed: {
    hasEntries() {
      const keyCount = Object.keys(this.entry).length;
      const values = Object.values(this.entry).filter(value => !!value).length;
      return keyCount === values;
    },
    invalid() {
      return !this.hasEntries || !!this.errors.items.length;
    },
  },
  methods: {
    ...mapActions(['setLoading']),
    async onsubmit() {
      if (this.invalid) {
        console.error('Form is invalid');
        return;
      }
      this.setLoading(true);
      setTimeout(() => {
        this.setLoading(false);
      }, 5000);
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

.errors {
  margin: 2rem 0 0;
  padding: 1rem;
  font-weight: 700;
  font-size: 14px;
  background-color: $color-orange-dark;
  color: $color-white;
}

button {
  background: linear-gradient(#de6cff, #bc41df);
  color: $color-white;
  border: 0;
  border-radius: 2px;
  font-weight: 700;
  font-size: 0.8em;
  text-transform: uppercase;
  letter-spacing: 1px;
  line-height: 1.5;
  padding: 0.5em 2em;
  cursor: pointer;
  display: block;

  &:hover {
    background: #bc41df;
  }
}

.button {
  margin-top: 2rem;
}
</style>
