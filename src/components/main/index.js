
import { h, Component } from 'preact';
import { Router } from 'preact-router';
import preload from 'fg-loadcss'
import Header from '../header';
import Footer from '../footer';
import Home from '../home';
import About from '../about';
import Contact from '../contact';
import Portfolio from '../portfolio';
import style from './style.scss'
import S from 'string'

require('offline-plugin/runtime').install();

let didLoadFA = false

export default class App extends Component {
  handleRoute = e => {
    this.currentUrl = e.url;
  };

  loadFontAwesome() {
    if( !didLoadFA && document.querySelector('.fa') ) {
      didLoadFA = true
      preload.loadCSS('https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css')
    }
  }

  setTitle() {
    // console.log(this)
    // let { props, state } = this,
    //   title = state.meta && state.meta.title || props.route.title || '';
    // document.title = `${title} | ${config.title}`;
  }

  componentDidUpdate() {
    this.setTitle();
    this.loadFontAwesome()
  }

  componentDidMount() {
    this.setTitle()
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
