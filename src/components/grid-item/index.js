
import { h, Component } from 'preact'
import { Link } from 'preact-router'
import inView from 'in-view'
import style from './style.scss'

function makeid() {
  let text = ''
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (let i = 0; i < 5; i += 1) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}

export default class Grid extends Component {
  constructor(props) {
    super(props)
    this.item_id = makeid()
  }

  componentDidMount() {
    const target = `[data-grid-id="${this.item_id}"]`
    inView(target)
    .on('enter', el => {
      el.classList.add(style.inview)
    })
    .on('exit', el => {
      el.classList.remove(style.inview)
    })
  }

  render() {
    return (
      <div className={style['grid-item']} data-grid-id={this.item_id}>
        <div className={style['grid-item-wrapper']}>
          <a href={this.props.url} target="_blank" rel="noopener noreferrer">
            <h4>{this.props.title}</h4>
            <div className={style['grid-item-content']}>
              <p className={style.info}>
                <i className="fa fa-star-o" data-likes={this.props.likes} />
                <i className={[style.language, style[this.props.language.toLowerCase()]].join(' ')} />
              </p>
              <p>{this.props.description}</p>
              <p className={style['read-more']}>See More &rarr;</p>
            </div>
          </a>
        </div>
      </div>
    )
  }
}
