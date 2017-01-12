
const spawn = require('child_process').spawn
const path = require('path')

let yarn

export function start() {
  let notDone = true
  const cwd = path.resolve(__dirname, '..')
  const output = []
  console.log('Rebuilding and spinning up server')
  return new Promise(function (resolve) {
    yarn = spawn('yarn', ['run', 'local:server'], {
      cwd,
      env: Object.assign({
        WEB_CONCURRENCY: 1,
        DEBUG: 'nightmare',
      }, process.env),
    })
    yarn.stderr.on('data', data => {
      output.push(`${data}`)
    })
    yarn.stdout.on('data', data => {
      if (notDone && data.indexOf('Viewable on port 3001') > -1) {
        notDone = false
        resolve()
      }
    })
    yarn.on('exit', code => {
      if (code) {
        console.log('='.repeat(15))
        console.log(`=== yarn exited with code ${code} ===`)
        console.log('Error Output:')
        console.log(output.join('\n'))
        console.log('='.repeat(15))
      }
    })
  }).catch(function (err) {
    console.log(err)
  })
}

export function stop(cb) {
  yarn.kill()
  yarn = null
  setTimeout(function () {
    cb()
  }, 250)
}
