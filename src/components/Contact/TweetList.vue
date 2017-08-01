<template>
  <div class="tweets">
    <ul>
      <template v-for="tweet in tweets">
        <tweet
          :text="tweet.text"
          :href="tweet.href"
          :time="tweet.time"
        />
      </template>
    </ul>
  </div>
</template>

<script>
  import Tweet from '@/components/Contact/Tweet';
  import { getTweets } from '@/lib/data';

  export default {
    name: 'tweet-list',
    components: {
      Tweet,
    },
    data() {
      return {
        tweets: [],
      };
    },
    methods: {
      formatTweets(array) {
        this.tweets = array.slice(0, 3).map((object) => {
          const idString = object.id_str;
          const screenName = object.user.screen_name;
          return {
            href: `https://twitter.com/${screenName}/status/${idString}`,
            time: object.created_at,
            text: object.text,
          };
        });
      },
    },
    beforeMount() {
      getTweets().then(this.formatTweets, (error) => {
        console.warn(error);
      });
    },
  };
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/main";

  .tweets {
    // ...
  }
</style>
