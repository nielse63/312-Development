<template>
  <div class="timeline">
    <template v-for="(row, index) in rows">
      <timeline-row
        :height="row.height"
        :item="row.item"
        :index="index"
      />
    </template>
  </div>
</template>

<script>
  import { differenceInDays } from 'date-fns';
  import TimelineRow from '@/components/Timeline/TimelineRow';

  export default {
    name: 'timeline',
    components: {
      TimelineRow,
    },
    data() {
      return {
        items: [
          {
            title: 'Enova International',
            content: 'Senior UI Engineer',
            date: new Date('2016-11-01'),
          }, {
            title: 'Clique Studios',
            content: 'Senior Engineer',
            date: new Date('2013-10-15'),
          }, {
            title: 'Symmetri Marketing Group',
            content: 'Web Developer',
            date: new Date('2012-08-01'),
          }, {
            title: 'Blueprint Design Studios',
            content: 'Junior Developer',
            date: new Date('2011-07-01'),
          },
        ],
      };
    },
    computed: {
      dates() {
        const lastDate = this.items[this.items.length - 1].date;
        const date = new Date();
        const leftDate = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
          date.getHours(),
          date.getMinutes(),
          date.getSeconds()
        );
        const rightDate = new Date(
          lastDate.getFullYear(),
          lastDate.getMonth(),
          lastDate.getDate(),
          lastDate.getHours(),
          lastDate.getMinutes(),
          lastDate.getSeconds()
        );
        const days = differenceInDays(
          leftDate,
          rightDate
        );
        return {
          days,
        };
      },
      rows() {
        return this.items.map((item, i) => {
          let end;
          if (!i) {
            end = new Date();
          } else {
            end = this.items[i - 1].date;
          }
          const start = item.date;
          const days = differenceInDays(
            end,
            start
          );
          const diff = days / this.dates.days;
          return {
            item,
            height: diff * 100,
          };
        });
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/main";

  .timeline {
    display: flex;
    flex-direction: column;
    position: relative;
    line-height: 1.25;
    height: 800px;

    @media (min-width: $tablet-width) {
      height: 600px;
    }

    @media (max-width: $tablet-width-max) {
      padding-right: 1em;
    }
  }
</style>
