
import { h, Component } from 'preact'
import { Link } from 'preact-router'
import style from './style.scss'

export default class Grid extends Component {
  render() {
    return (
      <div className={style['grid-item']}>
        <div className={style['grid-item-wrapper']}>
          <a href={this.props.url} target="_blank" rel="noopener noreferrer">
            <h4>{this.props.title}</h4>
            <div className={style['grid-item-content']}>
              <p className={style.info}>
                <i className={[style.language, style[this.props.language.toLowerCase()]].join(' ')} />
                <i className="fa fa-star-o" data-likes={this.props.likes} />
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
