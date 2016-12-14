
import { h, Component } from 'preact'
import BackgroundImage from '../background-image'
import { Link } from 'preact-router';
import style from './style.scss'

export default class Contact extends Component {
  render() {
    return (
      <div class={style.page}>
        <BackgroundImage src='/assets/images/bg4.jpg' />
        <div class={style['page-content']}>
          <div class={style.container}>
            <h1><mark>Reach</mark> out</h1>
          </div>
        </div>
        <div class={style.content} data-midnight>
          <div class={style['container-narrow']}>
            <h3>Email &amp; Social Media</h3>
            <p class={style.center}>
              <Link href="/"><i className="fa fa-envelope-open-o" aria-hidden="true" /></Link>
              <Link href="/"><i className="fa fa-github" aria-hidden="true"></i></Link>
              <Link href="/"><i className="fa fa-twitter" aria-hidden="true"></i></Link>
              <Link href="/"><i className="fa fa-dribbble" aria-hidden="true"></i></Link>
              <Link href="/"><i className="fa fa-facebook-official" aria-hidden="true"></i></Link>
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
              <div class={style.full}>
                <label>Message</label>
                <textarea />
              </div>
              <div class={style.full}>
                <button type='submit'>Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
