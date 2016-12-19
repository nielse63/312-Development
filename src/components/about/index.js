
import { h, Component } from 'preact'
import extend from 'lodash.assign'
import BackgroundImage from '../background-image'
import Banner from '../banner'
import style from './style.scss'
import config from '../../config.json'

export default class About extends Component {
  render() {
    return (
      <div className={style.page}>
        <BackgroundImage src="/assets/images/bg3.jpg" />
        <Banner position="bottom-left" internal>
          <h1>Who I am</h1>
          <h2>and <mark>what I do</mark></h2>
        </Banner>
        <div className={style.content} data-midnight>
          <div className={style['container-narrow']}>
            <p className={style.intro} dangerouslySetInnerHTML={{ __html: config.CONTENT.about.intro }} />
            <p>To learn more about me you can always <a href="mailto:erik@312development.com">email me</a>. And make sure you <a href="https://twitter.com/erikkylenielsen" target="_blank" rel="noopener noreferrer">follow me on Twitter</a> to get the latest JavaScript news, articles, and resources.</p>
            <p>Below are lists of my proficiencies. You can see more of my work on my <a href="/portfolio">portfolio</a> page or at my <a href="https://github.com/nielse63" target="_blank" rel="noopener noreferrer">GitHub account</a>.</p>
            <div className={style.table}>
              <div className={style['table-col']}>
                <p className={style['table-header']}>Core</p>
                <ul>
                  <li>JavaScript</li>
                  <li>CSS3</li>
                  <li>HTML5</li>
                  <li>Mobile & Responsive Design</li>
                  <li>Node.js</li>
                  <li>WebRTC, WebSockets</li>
                  <li>Canvas + Visualization</li>
                  <li>Ruby &amp; Ruby on Rails</li>
                  <li>PHP</li>
                  <li>MySQL</li>
                  <li>Postgres</li>
                </ul>
              </div>
              <div className={style['table-col']}>
                <p className={style['table-header']}>Libraries</p>
                <ul>
                  <li>React.js</li>
                  <li>Angular.js</li>
                  <li>Express</li>
                  <li>Grunt &amp; Gulp</li>
                  <li>Advanced WordPress</li>
                  <li>jQuery</li>
                  <li>Bootstrap &amp; Foundation</li>
                  <li>Ionic</li>
                </ul>
              </div>
              <div className={style['table-col']}>
                <p className={style['table-header']}>JavaScript</p>
                <ul>
                  <li>Google Maps</li>
                  <li>Facebook</li>
                  <li>Twitter</li>
                  <li>MailChimp</li>
                  <li>SalesForce</li>
                  <li>Instagram</li>
                  <li>Flickr</li>
                  <li>YouTube</li>
                  <li>oAuth</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
