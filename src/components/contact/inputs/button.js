
import { h, Component } from 'preact'
import PropTypes from 'proptypes'
import style from '../style.scss'

export default class Button extends Component {
  constructor(props) {
    Button.propTypes = {
      label: PropTypes.string.isRequired,
    }
    super(props)
  }

  render() {
    return (
      <div className={style.full}>
        <button type="submit">{this.props.label}</button>
      </div>
    )
  }
}
