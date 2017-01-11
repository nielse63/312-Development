
import { h, Component } from 'preact'

export default class Social extends Component {
  render() {
    const urls = [{
      url: 'mailto:erik@312development.com',
      icon: 'fa-envelope-open-o',
    }, {
      url: 'https://github.com/nielse63',
      icon: 'fa-github',
    }, {
      url: 'https://twitter.com/erikkylenielsen',
      icon: 'fa-twitter',
    }, {
      url: 'https://dribbble.com/ErikKyleNielsen',
      icon: 'fa-dribbble',
    }, {
      url: 'https://facebook.com/erikkylenieslen',
      icon: 'fa-facebook-official',
    }]

    return (
      <div>
        {urls.map(obj => (
          <a href={obj.url} target="_blank" rel="noopener noreferrer"><i className={`fa ${obj.icon}`} /></a>
        ))}
      </div>
    )
  }
}
