
import { h, Component } from 'preact'
import BackgroundImage from '../background-image'
import { Link } from 'preact-router'
import style from './style.scss'

export default class Contact extends Component {
  render() {
    return (
      <div className={style.page}>
        <BackgroundImage src="/assets/images/bg4.jpg" />
        <div className={style['page-content']}>
          <div className={style.container}>
            <h1>Let's stay</h1>
            <h2>in <mark>contact</mark></h2>
          </div>
        </div>
        <div className={style.content} data-midnight>
          <div className={style['container-narrow']}>
            <h3>Email &amp; Social Media</h3>
            <p className={style.center}>
              <Link href="/"><i className="fa fa-envelope-open-o" aria-hidden="true" /></Link>
              <Link href="/"><i className="fa fa-github" aria-hidden="true" /></Link>
              <Link href="/"><i className="fa fa-twitter" aria-hidden="true" /></Link>
              <Link href="/"><i className="fa fa-dribbble" aria-hidden="true" /></Link>
              <Link href="/"><i className="fa fa-facebook-official" aria-hidden="true" /></Link>
            </p>
            <h3>Contact</h3>
            <form>
              <div>
                <label>First Name</label>
                <input type="text" />
              </div>
              <div>
                <label>Last Name</label>
                <input type="text" />
              </div>
              <div>
                <label>Email</label>
                <input type="email" />
              </div>
              <div>
                <label>Phone Number</label>
                <input type="tel" />
              </div>
              <div className={style.full}>
                <label>Message</label>
                <textarea />
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
