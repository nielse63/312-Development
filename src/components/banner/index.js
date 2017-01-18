
import { h, Component } from 'preact'
import PropTypes from 'proptypes'
import style from './style.scss'

class Banner extends Component {
  constructor(props) {
    Banner.propTypes = {
      position: PropTypes.string.isRequired,
      internal: PropTypes.bool,
      children: PropTypes.element.isRequired,
    }
    Banner.defaultProps = {
      internal: true,
    }
    super(props)
  }

  wrapperClass() {
    return [
      style.banner,
      style[this.props.position],
      this.props.internal ? style.internal : '',
    ].join(' ')
  }

  render() {
    return (
      <div className={this.wrapperClass()}>
        <div className={style.container}>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default Banner
