
import { h, Component } from 'preact'
import { Link } from 'preact-router'
import extend from 'lodash.assign'
import BackgroundImage from '../background-image'
import Banner from '../banner'
import Social from '../social'
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
              <div>
                <label htmlFor="first_name">First Name</label>
                <input type="text" name="first_name" />
              </div>
              <div>
                <label htmlFor="last_name">Last Name</label>
                <input type="text" name="last_name" />
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" />
              </div>
              <div>
                <label htmlFor="phone">Phone Number</label>
                <input type="tel" name="phone" />
              </div>
              <div className={style.full}>
                <label htmlFor="message">Message</label>
                <textarea name="message" />
              </div>
              <div className={style.full}>
                <button type="submit">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}
