
import banner from './banner.nightmare'
import header from './header.nightmare'

export default function (utils) {
  Object.keys(utils.URLS).forEach(function (key) {
    const url = utils.URLS[key]
    header(url)
    banner(url)
  })
}
