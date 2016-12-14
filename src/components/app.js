
import { h, Component } from 'preact';
import { Router } from 'preact-router';
import preload from 'fg-loadcss'
import Header from './header';
import Footer from './footer';
import Home from './home';
import About from './about';
import Contact from './contact';
import Portfolio from './portfolio';
import createStore from '../store'
import config from '../config'
// import style from '../style/index.scss'
import S from 'string'

require('offline-plugin/runtime').install();

let didLoadFA = false

export default class App extends Component {
  state = { url: this.props.url || window.location.pathname };

  handleRoute = e => {
    this.currentUrl = e.url;
    this.setTitle()
  };

  setTitle() {
    let title = S(this.currentUrl.replace(/\//, '')).capitalize().s
    if(!title) {
      title = `${config.SITE_TITLE} | ${config.SITE_DESCRIPTION}`
    } else {
      title = `${title} | ${config.SITE_TITLE}`
    }
    document.title = title;
  }

  loadFontAwesome() {
    if( !didLoadFA && document.querySelector('.fa') ) {
      didLoadFA = true
      preload.loadCSS('https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css')
    }
  }

  componentDidUpdate() {
    this.loadFontAwesome()
  }

  componentDidMount() {
    this.loadFontAwesome()
  }

  render() {
    return (
      <div id="app">
        <Header />
        <Router onChange={this.handleRoute}>
          <Home path="/" />
          <About path="/about/" user="me" />
          <Contact path="/contact/" />
          <Portfolio path="/portfolio/" />
        </Router>
        <Footer />
      </div>
    );
  }
}
