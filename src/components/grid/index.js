
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
    }
  }

  componentDidMount() {
    fetch('https://api.github.com/users/nielse63/repos?visibility=public&sort=pushed')
    .then(response => response.json())
    .then((json) => {
      const offset = moment().subtract(1, 'years')
      const posts = json.filter((repo) => {
        const pushed = moment(repo.pushed_at)
        repo.pushed_at = pushed
        return !repo.private && (repo.stargazers_count || pushed.isAfter(offset))
      }).map((repo) => {
        repo.language = repo.language || ''
        repo.url = repo.homepage && repo.homepage.indexOf(window.location.host) < 0 ? repo.homepage : repo.url
        return repo
      })
      this.setState({
        posts,
      })
    })
  }

  render() {
    return (
      <div className={style.grid} data-midnight>
        <div className={style.container}>
          {this.state.posts.map((post, i) => (
            <GridItem
              key={i}
              title={post.name.replace(/-/g, ' ')}
              url={post.url}
              udpated={post.pushed_at.format('MMM Do, YYYY')}
              description={post.description}
              likes={(post.stargazers_count + post.watchers_count)}
              language={post.language}
            />
          ))}
        </div>
      </div>
    )
  }
}
