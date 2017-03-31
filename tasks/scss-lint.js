
// const shelljs = require('shelljs')
// const cp = require('child_process')
// const path = require('path')
// const fs = require('fs')

// const src = path.join(__dirname, '../src')
// // const env = Object.assign({
// //   PATH: '/Users/enielsen/.gem/ruby/2.3.3/bin:/Users/enielsen/.rvm/rubies/ruby-2.3.3/lib/ruby/gems/2.3.0/bin:/Users/enielsen/.rubies/ruby-2.3.3/bin:/Users/enielsen/.rvm/gems/ruby-2.3.1@global/bin:/Users/enielsen/.rvm/rubies/ruby-2.3.1/bin:/Users/enielsen/.gem/ruby/2.3.1/bin:/Users/enielsen/Sites/vm/8b/bin:/usr/local/sbin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/opt/X11/bin:/usr/local/go/bin:/Applications/Wireshark.app/Contents/MacOS:/usr/local/go/bin:/Users/enielsen/go/bin:/usr/local/go/bin:/Users/enielsen/go/bin:/usr/local/bin:/usr/local/Cellar/node/7.7.2/bin:/usr/local/go/bin:/Users/enielsen/go/bin:/usr/local/go/bin:/Users/enielsen/go/bin:/Users/enielsen/.rvm/bin'
// // }, process.env)

// shelljs.exec(`scss-lint --format=JSON ${src}`, {
//   async: true,
//   silent: true,
//   // cwd: path.join(__dirname, '../'),
//   // env: env,
// }, (err, stdout, stderr) => {
//   // if(err) {
//   //   console.log(err)
//   //   console.log(stderr)
//   //   return
//   // }
//   const results = JSON.parse(stdout)
//   console.log(results) // eslint-disable-line no-console
// })
