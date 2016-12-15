
import { loadCSS } from 'fg-loadcss'

export function getStyle() {
  loadCSS('https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css')
}

export function getScript(callback = () => {}) {
  const d = document
  if (d.getElementById('jquery-js')) {
    callback()
    return
  }

  const g = d.createElement('script')
  const s = d.getElementsByTagName('script')[0]
  g.src = 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js'
  g.id = 'jquery-js'
  g.async = 'true'
  g.onload = g.onreadystatechange = function () {
    const rs = this.readyState
    if (rs && rs !== 'complete' && rs !== 'loaded') return
    callback()
  }
  s.parentNode.insertBefore(g, s)
}

function preloadImage(src) {
  const link = document.createElement('link')
  link.href = src
  link.rel = 'preload'
  link.as = 'image'
  document.head.appendChild(link)
}

function preloadIcons() {
  [
    './assets/images/menu-pink.svg',
    './assets/images/icon-pink.svg',
  ].forEach((icon) => {
    preloadImage(icon)
  })
}

export function preloadImages(size = 'full') {
  preloadIcons()

  let i = 0
  while (i < 4) {
    const basename = `bg${(i + 1)}-${size}.jpg`
    const src = `./assets/images/${basename}`
    preloadImage(src)
    i += 1
  }
}
