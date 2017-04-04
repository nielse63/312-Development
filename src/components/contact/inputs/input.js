
import { h, Component } from 'preact'
import PropTypes from 'proptypes'
import style from '../style.scss'

export default class Input extends Component {
  constructor(props) {
    Input.propTypes = {
      type: PropTypes.string,
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }
    Input.defaultProps = {
      type: 'text',
    }
    super(props)
  }

  render() {
    const name = this.props.name
    const type = this.props.type || Input.defaultProps.type
    const label = this.props.label
    return (
      <div className={style.col}>
        <label htmlFor={name}>{label}</label>
        <input type={type} name={name} id={name} aria-label={label} />
      </div>
    )
  }
}
