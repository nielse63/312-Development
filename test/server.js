
const spawn = require('child_process').spawn

let yarn = null

exports.start = function () {
  let notDone = true
  return new Promise(function (resolve) {
    const cwd = process.cwd()
    console.log('=== Creating new build ===')
    yarn = spawn('yarn', ['run', 'local', '--', '--trace-warnings'], {
      cwd,
      env: Object.assign({
        NODE_ENV: 'production',
        IS_LOCAL: true,
        WEB_CONCURRENCY: 1,
      }, process.env),
    })
    yarn.stderr.on('data', ...args => {
      console.log('stderr:')
      console.log(args)
    })
    yarn.stdout.on('data', data => {
      // console.log(`stdout: ${data}`)
      if (notDone && data.indexOf('Viewable on port 3001') > -1) {
        notDone = false
        resolve()
      }
    })
    yarn.on('close', (code, ...args) => {
      console.log(`=== yarn exited with code ${code} ===`)
      console.log(args)
    })
  }).catch(function (err) {
    console.log(`err: ${err}`)
  })
}

exports.stop = function () {
  console.log(yarn)
  yarn.kill()
  setTimeout(function () {
    console.log(yarn)
  }, 0)
}
