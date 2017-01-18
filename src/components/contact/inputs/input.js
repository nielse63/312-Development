
import { h, Component } from 'preact'
import PropTypes from 'proptypes'

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
    return (
      <div>
        <label htmlFor={this.props.name}>{this.props.label}</label>
        <input type={this.props.type} name={this.props.name} />
      </div>
    )
  }
}
