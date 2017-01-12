/* eslint-disable no-console */

const async = require('async')
const css = require('./critical-css')
const fonts = require('./fonts')
const images = require('./images')

const q = async.queue((task, callback) => {
  console.log(`Running task:${task.name}`)
  return new Promise(resolve => {
    task.function(resolve)
  }).then(() => {
    callback()
  }).catch(err => {
    throw err
  })
}, 3)

q.push([
  {
    name: 'css',
    function: css,
  }, {
    name: 'fonts',
    function: fonts,
  }, {
    name: 'images',
    function: images,
  },
], err => {
  if (err) {
    throw err
  }
})
