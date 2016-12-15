
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

export function preloadImages() {
  let i = 0
  while (i < 4) {
    const link = document.createElement('link')
    link.href = `./assets/images/bg${(i + 1)}-large.jpg`
    link.rel = 'preload'
    link.as = 'image'
    document.head.appendChild(link)
    i++
  }
}
