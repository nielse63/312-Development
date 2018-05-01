<template>
  <div class="page contact">
    <banner title="Contact Me" />
    <section class="panel">
      <div class="container">
        <div class="row">
          <div class="col col__left">
            <panel-header title="Shoot Me a Message" />
            <form action="/submission" class="form" method="post" novalidate="novalidate" v-on:submit="onsubmit">
              <input-col name="First Name" autocomplete="given-name" />
              <input-col name="Last Name" autocomplete="family-name" />
              <input-col name="Email Address" type="email" autocomplete="email" />
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
  import Banner from '@/components/Banner';
  import InputCol from '@/components/Contact/InputCol';
  import TweetList from '@/components/Contact/TweetList';
  import PanelHeader from '@/components/Panels/PanelHeader';

  const invalidateChildElement = (child) => {
    if (child.valid && !child.value) {
      child.valid = false;
    }
    return child;
  };

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
      };
    },
    methods: {
      onsubmit(e) {
        const invalidChildren = this.$children
          .filter(({ type }) => type)
          .map(invalidateChildElement)
          .filter(({ valid }) => !valid);
        this.valid = !invalidChildren.length;
        if (!this.valid && !window.IN_TESTING) {
          /* istanbul ignore next */
          e.preventDefault();
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import '../assets/styles/main';

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
