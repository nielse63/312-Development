
import { h, Component } from 'preact';
import { Router } from 'preact-router';
import config from '../config.json'
import Header from './header';
// import Footer from './footer';
import Home from './home';
import Profile from './profile';
import style from '../style/index.scss'

require('offline-plugin/runtime').install();

export default class App extends Component {
  handleRoute = e => {
    this.currentUrl = e.url;
  };

  render() {
    return (
      <div id="app">
        <Header />
        <Router onChange={this.handleRoute}>
          <Home path="/" />
          <Profile path="/profile/" user="me" />
          <Profile path="/contact/" />
        </Router>
      </div>
    );
  }
}
