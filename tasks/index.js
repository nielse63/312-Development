/* eslint-disable no-console */

const css = require('./critical-css')
const fonts = require('./fonts')
const images = require('./images')

console.log('Running task: css')
css(() => {
  console.log('Complete: css')
})
console.log('Running task: fonts')
fonts(() => {
  console.log('Complete: fonts')
})
console.log('Running task: images')
images(() => {
  console.log('Complete: images')
})
