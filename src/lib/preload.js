
import { loadCSS } from 'fg-loadcss'

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

export function createResourceHint(rel, src, type = null) {
  const link = document.createElement('link')
  link.href = src
  link.rel = rel
  if (type) {
    link.as = type
  }
  document.head.appendChild(link)
}

export function getStyle() {
  if (!navigator.onLine) {
    return
  }

  setTimeout(() => {
    if (document.querySelectorAll('.fa').length && !document.querySelector('[href$="font-awesome.min.css"]')) {
      loadCSS('https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css')
    }
  }, 1000)
}

export function supportsLink(type) {
  function DOMTokenListSupports(tokenList, token) {
    if (!tokenList || !tokenList.supports) {
      return
    }
    try {
      return tokenList.supports(token)
    } catch (e) {
      /* eslint-disable no-console */
      if (e instanceof TypeError) {
        console.log("The DOMTokenList doesn't have a supported tokens list")
      } else {
        console.error("That shouldn't have happened")
      }
    }
  }
  return DOMTokenListSupports(document.createElement('link').relList, type)
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
    return getScript(script.src, script.callback)
  })
}

export function preloadImage(src) {
  if (supportsLink('prefetch')) {
    createResourceHint('prefetch', src, 'image')
  }
}

export function preloadDocument(src) {
  if (supportsLink('prerender')) {
    createResourceHint('prerender', src)
  }
}
