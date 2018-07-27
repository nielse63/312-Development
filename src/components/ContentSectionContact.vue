<template>
  <content-section title="Contact Me" @inview="inview">
    <article>
      <form novalidate="true" autocomplete="false" @submit.prevent="onsubmit">
        <form-input label="Name" :value="entry.name" @input="entry.name = $event" autocomplete="name"></form-input>
        <form-input label="Email" type="email" :value="entry.email" @input="entry.email = $event" autocomplete="email"></form-input>
        <form-input label="Company/Organization" type="text" :value="entry.company" @input="entry.company = $event" autocomplete="organization"></form-input>
        <form-input label="URL" type="url" :value="entry.url" @input="entry.url = $event"></form-input>
        <form-input label="Message" type="textarea"></form-input>
        <div class="button"><button type="submit">Submit</button></div>
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
  methods: {
    ...mapActions(['setLoading']),
    onsubmit() {
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
