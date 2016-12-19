
import { loadCSS } from 'fg-loadcss'

// TODO: Include local copy of font awesome
export function getStyle() {
  if (!navigator.onLine) {
    return
  }

  setTimeout(() => {
    if (!document.querySelector('[href*="font-awesome.min.css"]')) {
      loadCSS('https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css')
    }
  }, 1000)
}

function onScriptLoad(cb) {
  const rs = this.readyState
  if (rs && rs !== 'complete' && rs !== 'loaded') return
  cb()
}


function createScript(src, callback) {
  const id = src.split('/').pop().replace(/-|\./g, '-')
  if (document.getElementById(id)) {
    return
  }

  const g = document.createElement('script')
  g.src = src
  g.id = id
  g.async = 'true'
  g.setAttribute('crossorigin', 'anonymous')
  g.onload = g.onreadystatechange = onScriptLoad.bind(g, callback)
  return g
}

export function getScript(src, callback = () => {}) {
  if (!navigator.onLine && src.split('/')[2] !== location.host) {
    return
  }

  const script = createScript(src, callback)
  if (!script) {
    return
  }
  document.body.appendChild(script)
}

export function getScripts(scripts) {
  scripts.forEach(script => {
    if (typeof script === 'string') {
      return getScript(script)
    }
    getScript(script.src, script.callback)
  })
}

export function preloadImage(src) {
  const link = document.createElement('link')
  link.href = src
  link.rel = 'preload'
  link.as = 'image'
  setTimeout(() => {
    document.head.appendChild(link)
  }, 150)
}
