
import runtime from 'serviceworker-webpack-plugin/lib/runtime'
import registerEvents from 'serviceworker-webpack-plugin/lib/browser/registerEvents'
import applyUpdate from 'serviceworker-webpack-plugin/lib/browser/applyUpdate'

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
        applyUpdate()
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
  }
}
