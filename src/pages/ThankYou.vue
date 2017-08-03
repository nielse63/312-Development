<template>
  <div class="page thank-you">
    <banner title="Thank You" subtitle="For your submission" />
    <section class="panel">
      <div class="container container__narrow">
        <panel-header title="I'll be in touch shortly" />
        <p><strong>Message Details:</strong></p>
        <dl>
          <template v-for="(value, key) in details" v-if="value">
            <dt>{{key | titlize}}</dt>
            <dd>{{value}}</dd>
          </template>
        </dl>
      </div>
    </section>
  </div>
</template>

<script>
  import Banner from '@/components/Banner';
  import PanelHeader from '@/components/Panels/PanelHeader';
  import { get } from 'js-cookie';
  import { hasFormSubmission } from '@/lib/utils';

  export default {
    name: 'thank-you',
    components: {
      Banner,
      PanelHeader,
    },
    computed: {
      submission() {
        return (get('form_submission') || '').replace(/j:/, '');
      },
      details() {
        try {
          return JSON.parse(this.submission);
        } catch (e) {
          return {};
        }
      },
    },
    filters: {
      titlize(value = '') {
        return value.toString().titleCase();
      },
    },
    beforeMount() {
      if (!hasFormSubmission()) {
        window.location.href = '/#/contact';
      }
    },
  };
</script>

<style lang="scss" scoped>
  @import "../assets/styles/main";

  $dt-width: 125px;

  p {
    margin: 0;
  }

  dl {
    display: flex;
    flex-wrap: wrap;
    margin: 0;
  }

  dt,
  dd {
    margin: 1em 0 0;
    padding-top: 1em;
    border-top: 1px solid $border-color;
  }

  dt {
    @include flex-item($dt-width);

    font-weight: 700;
  }

  dd {
    @include flex-item(calc(100% - #{$dt-width}));
  }
</style>
