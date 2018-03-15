<template>
  <div class="tweets">
    <ul>
      <template v-for="tweet in tweets">
        <tweet
          :text="tweet.text"
          :href="tweet.url"
          :time="tweet.time"
          :date="tweet.date"
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
    async mounted() {
      this.tweets = this.$store.getters.getTweets.length ?
        this.$store.getters.getTweets :
        await getTweets();
    },
  };
</script>
