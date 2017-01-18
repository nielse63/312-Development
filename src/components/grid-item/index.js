
import { h, Component } from 'preact'
import PropTypes from 'proptypes'
import style from './style.scss'
import utils from '../../lib/utils'

export default class GridItem extends Component {
  constructor(props) {
    GridItem.propTypes = {
      url: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      likes: PropTypes.string.isRequired,
      language: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    }
    super(props)
    this.id = utils.makeid()
  }

  render() {
    return (
      <div className={style['grid-item']} data-grid-id={this.id}>
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
