
const spawn = require('child_process').spawn
const path = require('path')

let yarn

exports.start = function start() {
  let notDone = true
  const cwd = path.resolve(__dirname, '..')
  console.log('Rebuilding and spinning up server')
  return new Promise(function (resolve) {
    yarn = spawn('yarn', ['run', 'local', '--', '--trace-warnings'], {
      cwd,
      env: Object.assign({
        NODE_ENV: 'production',
        IS_LOCAL: true,
        WEB_CONCURRENCY: 1,
      }, process.env),
    })
    // yarn.stderr.on('data', data => {
    //   console.log(`stderr: ${data}`)
    // })
    yarn.stdout.on('data', data => {
      // console.log(`stdout: ${data}`)
      if (notDone && data.indexOf('Viewable on port 3001') > -1) {
        notDone = false
        resolve()
      }
    })
    yarn.on('exit', code => {
      if(code) console.log(`=== yarn exited with code ${code} ===`)
    })
  }).catch(function (err) {
    console.log(err)
  })
}

exports.stop = function stop(cb) {
  yarn.kill()
  yarn = null
  setTimeout(function () {
    cb()
  }, 250)
}
