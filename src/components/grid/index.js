
import 'whatwg-fetch'
import { h, Component } from 'preact'
import { Link } from 'preact-router'
import moment from 'moment'
import GridItem from '../grid-item'
import style from './style.scss'

export default class Grid extends Component {
  constructor(props) {
    super(props)
    this.state = {
      posts: [],
      now: moment().format('X'),
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

    fetch('https://api.github.com/users/nielse63/repos?visibility=public&sort=pushed')
    .then(response => response.json())
    .then(json => {
      const offset = moment().subtract(1, 'years')
      const posts = json.filter(repo => {
        const pushed = moment(repo.pushed_at)
        repo.pushed_at = pushed
        return !repo.private && repo.description && (repo.stargazers_count || pushed.isAfter(offset))
      }).map(repo => {
        repo.language = repo.language || ''
        repo.url = repo.homepage && repo.homepage.indexOf(window.location.host) < 0 ? repo.homepage : repo.url
        return {
          name: repo.name.replace(/-/g, ' '),
          url: repo.url,
          pushed_at: repo.pushed_at.format('MMM Do, YYYY'),
          description: repo.description,
          likes: repo.stargazers_count + repo.watchers_count,
          language: repo.language,
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
    if (!lastUpdate) {
      return false
    }
    const now = parseInt(this.state.now, 10)
    const diff = moment.duration(now - lastUpdate).asDays()
    return diff < 1
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
