<template>
  <div class="page contact">
    <banner title="Contact Me" />
    <section class="panel">
      <div class="container">
        <div class="row">
          <div class="col col__left">
            <panel-header title="Shoot Me a Message" />
            <form :action="action" class="form" method="post" novalidate="novalidate" v-on:submit="onsubmit">
              <input-col name="First Name" />
              <input-col name="Last Name" />
              <input-col name="Email Address" type="email" />
              <input-col name="Message" type="textarea" />
              <div class="row">
                <div class="col">
                  <button type="submit">Submit</button>
                </div>
              </div>
            </form>
          </div>
          <div class="col col__right">
            <panel-header title="Latest Tweets" />
            <tweet-list />
          </div>
        </div>
        </form>
      </div>
    </section>
  </div>
</template>

<script>
  // import { format, parse, isToday, isYesterday } from 'date-fns';
  import Banner from '@/components/Banner';
  import InputCol from '@/components/Contact/InputCol';
  import TweetList from '@/components/Contact/TweetList';
  import PanelHeader from '@/components/Panels/PanelHeader';
  import { hasFormSubmission } from '@/lib/utils';
  // import { getTweets } from '@/lib/data';

  export default {
    name: 'contact',
    components: {
      Banner,
      InputCol,
      TweetList,
      PanelHeader,
    },
    data() {
      return {
        valid: false,
        // tweets: []
      };
    },
    computed: {
      action() {
        const { protocol, hostname } = window.location;
        const port = 3000;
        const path = 'submission';

        return `${protocol}//${hostname}:${port}/${path}`;
      },
    },
    methods: {
      onsubmit(e) {
        let isValid = true;
        this.$children.forEach((child) => {
          if (child.valid && !child.value) {
            child.valid = false;
          }

          if (isValid && child.type && !child.valid) {
            isValid = false;
          }
        });

        if (!isValid) {
          e.preventDefault();
        }
      },
      // formatDate(createdAt) {
      //   const date = parse(createdAt);
      //   const time = format(date, 'h:mm a');
      //   let dateString = '';
      //   if(isToday(date)) {
      //     dateString = `Today @ ${time}`;
      //   } else if(isYesterday(date)) {
      //     dateString = `Yesterday @ ${time}`;
      //   } else {
      //     dateString = format(date, 'MMM DD @ HH:mm');
      //   }
      //   return dateString;
      // },
      // formatText(text) {
      //   return text.split(' ').map((word) => {
      //     if(/^http/.test(word)) {
      //       return `<span>${word}</span>`;
      //     }
      //     return word;
      //   }).join(' ');
      // },
      // formatTweets(array) {
      //   this.tweets = array.map((object) => {
      //     const idString = object.id_str;
      //     const screenName = object.user.screen_name;
      //     const url = `https://twitter.com/${screenName}/status/${idString}`;
      //     const date = this.formatDate(object.created_at);
      //     const text = this.formatText(object.text)
      //     return {
      //       url,
      //       dateTime: object.created_at,
      //       date,
      //       text,
      //     };
      //   })
      // }
    },
    beforeMount() {
      if (hasFormSubmission()) {
        window.location.href = '/#/thank-you';
      }

      // getTweets().then((json) => {
      //   try {
      //     const array = JSON.parse(json);
      //     this.formatTweets(array);
      //   } catch(e) {
      //     console.warn(e);
      //   }
      // })
    },
  };
</script>

<style lang="scss" scoped>
  @import "../assets/styles/components/banner";

  .row {
    @media (max-width: $tablet-width-max) {
      flex-direction: column;
    }

    + .row {
      margin-top: 2rem;
    }
  }

  .col {
    &__left {
      @media (min-width: $tablet-width) {
        @include flex-item(percentage(2 / 3));
      }
    }

    &__right {
      @media (max-width: $tablet-width-max) {
        margin-top: 2rem;
        padding-top: 2rem;
        border-top: 1px solid $border-color;
      }

      @media (min-width: $tablet-width) {
        @include flex-item(percentage(1 / 3));
      }
    }
  }

  button {
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 2px;
    padding: 1rem 3rem;
    border: 2px solid $color-pink;
    border-radius: 2px;
    background: none;
    color: $color-pink;
    background-color: fade-out($color-pink, 1);
    transition: background-color $link-transition-duration;

    &:hover,
    &:active {
      background-color: fade-out($color-pink, 0.95);
    }
  }
</style>
