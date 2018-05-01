<template>
  <li class="tweet">
    <a :href="href" :title="text" rel="noopener noreferrer" target="_blank">
      <p>{{content}} <span v-if="links">{{links}}</span></p>
      <time :datetime="time">{{date}}</time>
    </a>
  </li>
</template>

<script>
  export default {
    name: 'tweet',
    props: {
      text: {
        type: String,
        default: '',
      },
      href: {
        type: String,
        default: '',
      },
      date: {
        type: String,
        default: '',
      },
      time: {
        type: String,
        default: '',
      },
    },
    data() {
      return {
        links: '',
      };
    },
    computed: {
      content() {
        return this.formatText(this.text);
      },
    },
    methods: {
      formatText(text) {
        this.links = text.split(' ')
          .filter(word => /^http/.test(word))
          .join(' ');
        return text.split(' ')
          .filter(word => !/^http/.test(word))
          .join(' ');
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import '../../assets/styles/main';

  .tweet {
    font-size: 14px;

    p {
      margin: 0;
    }

    span {
      color: $color-blue;
      font-weight: bold;
      white-space: nowrap;
    }

    a {
      display: block;
      padding: 1rem;
      border: 1px solid $border-color;
      border-radius: 3px;
    }

    time {
      font-weight: 700;
      text-transform: uppercase;
      font-size: 12px;
      letter-spacing: 2px;
      display: block;
      margin-top: 1rem;
      padding-top: 1rem;
      border-top: 1px solid $border-color;
    }

    + .tweet {
      margin-top: 2rem;
    }
  }
</style>
