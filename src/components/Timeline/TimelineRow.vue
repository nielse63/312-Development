<template>
  <div
    class="timeline__row"
    v-bind:style="this.style"
    v-bind:class="this.class"
  >
    <timeline-item
      :title="this.item.title"
      :content="this.item.content"
      :date="this.item.date"
      :even="this.even"
    />
 </div>
</template>

<script>
  import TimelineItem from '@/components/Timeline/TimelineItem';

  export default {
    name: 'timeline-row',
    components: {
      TimelineItem,
    },
    props: {
      height: {
        type: Number,
      },
      item: {
        type: Object,
      },
      index: {
        type: Number,
      },
    },
    computed: {
      even() {
        return !!(this.index % 2);
      },
      class() {
        return this.item.title.split(' ')[0].toLowerCase();
      },
      style() {
        return {
          height: `${this.height}%`,
        };
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/main";

  .timeline__row {
    position: relative;
    perspective: 1000px;

    &:before {
      content: '';
      position: absolute;
      top: 0.25rem;
      left: 100%;
      bottom: 0.25rem;
      width: 0.5rem;
      transform: translate(-50%, 0);
      background-color: $border-color;

      @media (min-width: $tablet-width) {
        left: 50%;
      }
    }

    &:first-child {
      &:before {
        @media (min-width: $tablet-width) {
          top: 50%;
        }
      }
    }

    &:last-child {
      &:before {
        @media (min-width: $tablet-width) {
          bottom: 50%;
        }
      }
    }

    &.enova {
      &:before {
        background-color: #1b9bdc;
      }
    }

    &.clique {
      &:before {
        background-color: #f88601;
      }
    }

    &.symmetri {
      &:before {
        background-color: #1385ad;
      }
    }

    &.blueprint {
      &:before {
        background-color: #3c7ac2;
      }
    }
  }
</style>
