
import { h, Component } from 'preact'
import style from './style.scss'

class Banner extends Component {
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
