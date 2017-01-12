
import runtime from 'serviceworker-webpack-plugin/lib/runtime'
import registerEvents from 'serviceworker-webpack-plugin/lib/browser/registerEvents'
import applyUpdate from 'serviceworker-webpack-plugin/lib/browser/applyUpdate'

const ONE_WEEK = 60 * 60 * 24 * 7 * 1000
const LS_KEY = 'swupdate'

export function shouldUpdate() {
  const updated = parseInt(localStorage.getItem(LS_KEY), 10)
  if (!updated || isNaN(updated)) {
    return false
  }
  const diff = Math.abs(Date.now() - updated)
  return diff > ONE_WEEK
}

export function update() {
  applyUpdate()
  localStorage.setItem(LS_KEY, Date.now())
}

export function hasServiceWorker() {
  return ('serviceWorker' in navigator &&
    (window.location.protocol === 'https:' || window.location.hostname === 'localhost'))
}

export function listener() {
  /* eslint-disable no-console */

  if (hasServiceWorker()) {
    registerEvents(runtime.register(), {
      onInstalled: () => {
        console.log('[SW]: Installed')
      },
      onUpdateReady: () => {
        console.log('[SW]: Update ready')
      },
      onUpdating: () => {
        console.log('[SW]: Updating')
      },
      onUpdateFailed: () => {
        console.log('[SW]: Update Failed')
      },
      onUpdated: () => {
        console.log('[SW]: Updated')
      },
    })

    // update sw
    if (shouldUpdate()) {
      update()
    }
  }
}
