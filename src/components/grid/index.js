
import 'whatwg-fetch'
import { h, Component } from 'preact'
import { Link } from 'preact-router'
import GridItem from '../grid-item'
import style from './style.scss'

export default class Grid extends Component {
  constructor(props) {
    super(props)
    this.state = {
      posts: [],
      now: performance.now(),
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.getFeed()
    }, 1000)
  }

  getFeed() {
    const feed = localStorage.getItem('feed')
    const lastUpdate = localStorage.getItem('update')
    if (feed && this.shouldGetCache(lastUpdate)) {
      return this.getCachedFeed(feed)
    }

    return fetch('https://api.github.com/users/nielse63/repos?visibility=public&sort=pushed')
      .then(response => response.json())
      .then(json => {
        const mOffset = 31556952000
        const cutoff = this.state.now - mOffset
        const posts = json.filter(repo => {
          const object = Object.assign({}, repo)
          const pushed = new Date(object.pushed_at)
          object.pushed_at = pushed
          return !object.private &&
            object.description &&
            (object.stargazers_count || pushed > cutoff)
        }).map(repo => {
          const object = Object.assign({}, repo)
          object.language = object.language || ''
          object.url = object.homepage &&
            object.homepage.indexOf(window.location.host) < 0 ? object.homepage : object.html_url
          return {
            name: object.name.replace(/-/g, ' '),
            url: object.url,
            pushed_at: object.pushed_at,
            description: object.description,
            likes: object.stargazers_count + object.watchers_count,
            language: object.language,
          }
        })

        // set state
        this.setState({
          posts,
        })

        // cache in localstorage
        this.storeFeed(posts)
      })
  }

  getCachedFeed(feed) {
    return this.setState({
      posts: JSON.parse(feed),
    })
  }

  shouldGetCache(lastUpdate) {
    const last = parseInt(lastUpdate, 10)
    if (!last || isNaN(last)) {
      return false
    }
    const diff = this.state.now - last
    return diff < 86400000
  }

  storeFeed(array) {
    localStorage.setItem('update', this.state.now)
    localStorage.setItem('feed', JSON.stringify(this.state.posts))
  }

  render() {
    return (
      <div className={style.grid} data-midnight>
        <div className={style.container}>
          {this.state.posts.map((post, i) => (
            <GridItem
              key={i}
              title={post.name}
              url={post.url}
              udpated={post.pushed_at}
              description={post.description}
              likes={post.likes}
              language={post.language}
            />
          ))}
        </div>
      </div>
    )
  }
}
