
const shelljs = require('shelljs')
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
  ].join(':'),
}, process.env)

function getColorRegex(color) {
  const clr = color
    .replace('(', '\\(')
    .replace(')', '\\)')
  return new RegExp(clr, 'g')
}

function getColorName(color, existing, fileContent) {
  const names = namer(color)
  let name = names.basic[0].name
  if (existing.indexOf(name) > -1) {
    const count = existing.filter(c => c === name).length
    name = `${name}${count + 1}`
  }
  if (fileContent.indexOf(`$${name};`) > -1 || fileContent.indexOf(`$${name} `) > -1) {
    name = `${name}-custom`
  }
  return name
}

function handleColorVars(file, results) {
  const colors = [...new Set(results.filter(object => object.linter === 'ColorVariable').map(object => {
    const reason = object.reason.match(/`(.*?)`/)
    return (reason && reason[1]) || ''
  }).sort())]
  if (!colors.length) {
    return ''
  }
  let fileContent = fs.readFileSync(file, 'utf8')
  const colorVars = []
  const colorNames = []
  colors.forEach(color => {
    // generate variable name
    const name = getColorName(color, colorNames, fileContent)

    // for tracking purposes
    colorNames.push(name)
    colorVars.push(`$${name}: ${color};`)

    // replace in file content
    const rgx = getColorRegex(color)
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
  const types = results.map(object => object.linter)
  let fileContent = ''

  // handle color vars
  if (types.indexOf('ColorVariable') > -1) {
    fileContent = handleColorVars(file, results)
  }

  // write out file
  if (fileContent) {
    fs.writeFileSync(file, fileContent)
  }
}

shelljs.exec(`scss-lint --format=JSON ${src}`, {
  async: true,
  silent: true,
  cwd: path.join(__dirname, '../'),
  env,
}, (err, stdout) => {
  try {
    const results = JSON.parse(stdout)
    Object.keys(results).forEach(file => {
      const result = results[file]
      resultsForFile(file, result)
    })
  } catch (e) {
    console.log(e) // eslint-disable-line no-console
  }
})
