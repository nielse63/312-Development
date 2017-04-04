
const shelljs = require('shelljs')
const cp = require('child_process')
const path = require('path')
const fs = require('fs')
const namer = require('color-namer')

const src = path.join(__dirname, '../src')
const env = Object.assign({
  PATH: [
    '/Users/enielsen/.gem/ruby/2.3.3/bin',
    '/Users/enielsen/.rvm/rubies/ruby-2.3.3/lib/ruby/gems/2.3.0/bin',
    '/Users/enielsen/.rubies/ruby-2.3.3/bin',
    '/Users/enielsen/.rvm/gems/ruby-2.3.1/bin',
    '/Users/enielsen/.rvm/gems/ruby-2.3.1@global/bin',
    '/Users/enielsen/.rvm/rubies/ruby-2.3.1/bin',
    '/Users/enielsen/Sites/vm/8b/bin',
    '/usr/local/opt/gettext/bin',
    '/usr/local/opt/findutils/libexec/gnubin',
    '/usr/local/bin',
    '/usr/local/sbin',
    '/usr/local/bin',
    '/usr/bin',
    '/bin',
    '/usr/sbin',
    '/sbin',
    '/opt/X11/bin',
    '/usr/local/go/bin',
    '/Applications/Wireshark.app/Contents/MacOS',
    '/usr/local/go/bin',
    '/Users/enielsen/go/bin',
    '/Users/enielsen/.rvm/bin',
  ].join(':')
}, process.env)

function handleColorVars(file, results) {
  const colors = [...new Set(results.filter(function(object) {
    return object.linter === 'ColorVariable'
  }).map(function(object) {
    const reason = object.reason.match(/`(.*?)`/)
    return (reason && reason[1]) || ''
  }).sort())]
  let fileContent = fs.readFileSync(file, 'utf8')
  if(!colors.length) {
    return fileContent
  }
  const colorVars = []
  const colorNames = []
  colors.forEach(function(color, i) {
    const names = namer(color)
    let name = names.basic[0].name
    if(colorNames.indexOf(name) > -1) {
      const count = colorNames.filter(function(c) {
        return c === name
      }).length
      name = `${name}${count + 1}`
    }
    if(fileContent.indexOf(`$${name};`) > -1) {
      name = `${name}-custom`
    }
    colorNames.push(name)
    colorVars.push(`$${name}: ${color};`)
    let clr = color
      .replace('(', '\\(')
      .replace(')', '\\)')
    const rgx = new RegExp(clr, 'g')
    fileContent = fileContent.replace(rgx, `$${name}`)
  })

  const masthead = `
// Generated Color Variables
// ========================================================================== */

${colorVars.join('\n')}
`
  return [masthead, fileContent].join('\n')
}

function resultsForFile(file, results) {
  const types = results.map(function(object) {
    return object.linter
  })
  let fileContent = ''

  // handle color vars
  if(types.indexOf('ColorVariable') > -1) {
    fileContent = handleColorVars(file, results)
  }

  // write out file
  if(fileContent) {
    fs.writeFileSync(file, fileContent)
  }
}

shelljs.exec(`scss-lint --format=JSON ${src}`, {
  async: true,
  silent: true,
  cwd: path.join(__dirname, '../'),
  env: env,
}, (err, stdout, stderr) => {
  const results = JSON.parse(stdout)
  Object.keys(results).forEach(function(file) {
    const result = results[file]
    resultsForFile(file, result)
  })
})
