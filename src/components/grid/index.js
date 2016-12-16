
import { h, Component } from 'preact'
import { Link } from 'preact-router'
import moment from 'moment'
import GridItem from '../grid-item'
import style from './style.scss'
import 'whatwg-fetch'

export default class Grid extends Component {
  static storeFeed(array) {
    if (!array || !array.length) {
      return
    }
    localStorage.setItem('feed', JSON.stringify(array))
  }

  constructor(props) {
    super(props)
    this.state = {
      posts: [],
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.getFeed()
    }, 500)
  }

  getFeed() {
    const feed = localStorage.getItem('feed')
    if (feed) {
      return this.setState({
        posts: JSON.parse(feed),
      })
    }

    fetch('https://api.github.com/users/nielse63/repos?visibility=public&sort=pushed')
    .then(response => response.json())
    .then(json => {
      const offset = moment().subtract(1, 'years')
      const posts = json.filter(repo => {
        const pushed = moment(repo.pushed_at)
        repo.pushed_at = pushed
        return !repo.private && (repo.stargazers_count || pushed.isAfter(offset))
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
      Grid.storeFeed(posts)
    })
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
