
const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

const imagePath = path.resolve(__dirname, '../src/assets/images')
const sizes = {
  full : [2400, null],
  xlarge : [1920, null],
  large : [1400, null],
  medium : [1080, null],
  small : [480, 676],
}

fs.readdir(imagePath, (err, data) => {
  if(err) {
    throw new Error(err)
  }
  const files = data.filter((filename) => {
    return filename.indexOf('bg') > -1
  }).map((filename) => {
    return path.resolve(imagePath, filename)
  })

  files.forEach((file) => {
    const basename = path.basename(file)
    if( basename.indexOf('-') > -1 ) {
      fs.unlinkSync(file)
      return
    }

    const buffer = fs.readFileSync(file)
    const keys = Object.keys(sizes)
    keys.forEach((key) => {
      const newFilename = file.replace(/\.jpg$/, `-${key}.jpg`)
      if( fs.existsSync(newFilename) ) {
        return
      }

      const size = sizes[key]
      sharp(buffer)
        .resize(size[0], size[1])
        .max()
        .crop('south')
        .toFile(
          newFilename,
          (err, info) => {
            if(err) {
              throw new Error(err)
            }
            console.log(info)
        });
    })
  })
})
