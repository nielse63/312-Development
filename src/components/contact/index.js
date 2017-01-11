
import { h, Component } from 'preact'
import { Link } from 'preact-router'
// import extend from 'lodash.assign'
import BackgroundImage from '../background-image'
import Banner from '../banner'
import Social from '../social'
import TextInput from './inputs/input'
import TextArea from './inputs/textarea'
import Button from './inputs/button'
import style from './style.scss'

export default class Contact extends Component {
  constructor(props) {
    super(props)
    this.onSubmit = function onSubmit(e) {
      e.preventDefault()
      window.location.href = '/thank-you'
    }
  }

  render() {
    return (
      <div className={style.page}>
        <BackgroundImage src="/assets/images/bg4.jpg" />
        <Banner position="center" internal>
          <h1>Let&apos;s stay</h1>
          <h2>in <mark>contact</mark></h2>
        </Banner>
        <div className={style.content} data-midnight>
          <div className={style['container-narrow']}>
            <h3>Email &amp; Social Media</h3>
            <p className={style.center}>
              <Social />
            </p>
            <h3>Contact</h3>
            <form action={this.props.url} onSubmit={this.onSubmit}>
              <TextInput name="first_name" label="First Name" />
              <TextInput name="last_name" label="Last Name" />
              <TextInput type="email" name="email" label="Email" />
              <TextInput type="tel" name="phone" label="Phone Number" />
              <TextArea name="message" label="Message" />
              <Button label="Submit" />
            </form>
          </div>
        </div>
      </div>
    )
  }
}
