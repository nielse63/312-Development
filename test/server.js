
const spawn = require('child_process').spawn
const path = require('path')

let yarn

export function start(done) {
  let notDone = true
  const cwd = path.resolve(__dirname, '..')
  const indexjs = path.join(cwd, 'index.js')
  const output = []
  yarn = spawn('yarn', ['run', 'local:server'], {
    cwd,
    env: Object.assign({
      WEB_CONCURRENCY: 1,
      DEBUG: 'nightmare mocha',
    }, process.env),
  })
  yarn.stderr.on('data', data => {
    output.push(`${data}`)
  })
  yarn.stdout.on('data', data => {
    if (notDone && data.indexOf('Viewable on port 3001') > -1) {
      notDone = false
      done()
    }
  })
  yarn.on('exit', code => {
    if (code) {
      const err = [
        '='.repeat(15),
        `=== yarn exited with code ${code} ===`,
        'Error Output:',
        output.join('\n'),
        '='.repeat(15),
      ].join('\n')
      done(err)
    }
  })
}

export function stop(cb) {
  yarn.kill()
  yarn = null
  setTimeout(() => {
    cb()
  }, 250)
}
