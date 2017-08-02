
const path = require('path')
const fs = require('fs')

const index = path.resolve(__dirname, '../dist/index.html')

fs.readFile(index, 'utf8', (err, data) => {
  if(err) {
    console.error(err);
    return;
  }

  const newHTML = data
    .replace(/ type=text\/javascript src=\/static\/js\//g, ' src=/static/js/')
    .replace(/ src=\/static\/js\/app\./g, ' async src=/static/js/app.')

  fs.writeFile(index, newHTML, (error) => {
    if(error) {
      console.error(error);
    }
  });
})
