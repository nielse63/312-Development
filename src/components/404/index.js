
import { h, Component } from 'preact'
import BackgroundImage from '../background-image'
import Banner from '../banner'

// TODO: Turn this into a page template
export default class NotFound extends Component {
  render() {
    return (
      <div>
        <BackgroundImage src="/assets/images/bg1.jpg" />
        <Banner position="left">
          <h1>404 Error</h1>
          <h2>Page <mark>not found</mark></h2>
        </Banner>
      </div>
    )
  }
}
