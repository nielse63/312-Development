<template>
  <section class="panel">
    <div class="container">
      <h2 class="panel__title">What I'm Reading</h2>
      <card-row :items="articles" />
    </div>
  </section>
</template>

<script>
  import CardRow from '@/components/Card/CardRow';

  export default {
    name: 'reading-panel',
    components: {
      CardRow,
    },
    data() {
      /* eslint-disable global-require */
      return {
        mediumArticles: [{
          name: 'Webpack 4.1 and ES Modules (ESM)',
          description: 'Treeshaking with webpack has come a long way. My favorite parts of webpack 4 are the ES module handling and tree shaking improvements.',
          image: require('@/assets/images/articles/unit-tests.min.jpg'),
          url: 'https://medium.com/@zwegrzyniak/webpack-4-1-and-es-modules-esm-dd0bd7dca4da',
          readmore: 'Read it on Medium',
        }, {
          name: '10 Interview Questions Every JavaScript Developer Should Know',
          description: 'At most companies, management must trust the developers to give technical interviews in order to assess candidate skills. If you do well as a candidate, you’ll eventually need to interview. Here’s how.',
          image: require('@/assets/images/articles/interview-questions.min.jpg'),
          url: 'https://medium.com/javascript-scene/10-interview-questions-every-javascript-developer-should-know-6fa6bdf5ad95',
          readmore: 'Read it on Medium',
        }, {
          name: 'Scaling Node.js Applications',
          description: 'Scalability in Node.js is not an afterthought. It’s something that’s baked into the core of the runtime. Node is named Node to emphasize the idea that a Node application should comprise multiple small distributed nodes that communicate with each other.',
          image: require('@/assets/images/articles/scaling.min.jpg'),
          url: 'https://medium.freecodecamp.org/scaling-node-js-applications-8492bd8afadc',
          readmore: 'Read it on freeCodeCamp',
        }, {
          name: 'Say hello to HTTP/2 for Node.js Core',
          description: 'A few minutes ago I opened the initial pull-request that would provide an implementation of HTTP/2 for Node.js core. While it’s far from being production ready, this marks a key milestone.',
          // image: '',
          url: 'https://medium.com/the-node-js-collection/say-hello-to-http-2-for-node-js-core-261ba493846e',
          readmore: 'Read it on Medium',
        }, {
          name: 'ES8 was Released and here are its Main New Features 🔥',
          description: 'EcmaScript 8 or EcmaScript 2017 was officially released at the end of June by TC39. It seems that we are talking a lot about EcmaScript in the last year. It’s not for nothing. Currently the standard is to publish a new ES specification version once a year. ES6 was published in 2015 and ES7 was published in 2016, but did someone remembered when ES5 was released? It happened in 2009, before the magical rise of JavaScript.',
          image: require('@/assets/images/articles/es8.min.jpg'),
          url: 'https://hackernoon.com/es8-was-released-and-here-are-its-main-new-features-ee9c394adf66',
          readmore: 'Read it on HackerNoon',
        }, {
          name: 'A Guide to Becoming a Full-Stack Developer in 2017',
          description: 'Full-Stack Web Development, according to the Stack Overflow 2016 Developer Survey, is the most popular developer occupation today. It’s no wonder then that there are dozens of online and in-person programs that will help people become Full-Stack Developers and then even assist these new developers land high-paying programming jobs.',
          image: require('@/assets/images/articles/full-stack.min.jpg'),
          url: 'https://medium.com/coderbyte/a-guide-to-becoming-a-full-stack-developer-in-2017-5c3c08a1600c',
          readmore: 'Read it on Medium',
        }],
      };
    },
    computed: {
      articles() {
        const wordCount = 15;
        return this.mediumArticles.map((article) => {
          const { description } = article;
          const words = description.split(' ');
          const shortDescription = `${words.slice(0, wordCount).join(' ')}...`;
          return {
            ...article,
            ...{
              description: shortDescription,
            },
          };
        });
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import '../../assets/styles/main';
</style>
