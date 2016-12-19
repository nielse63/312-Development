/* eslint-disable no-console */

const pm2 = require('pm2')

const instances = process.env.WEB_CONCURRENCY || -1
const maxMemory = process.env.WEB_MEMORY || 512

function cb1(err, bus) {
  console.log('[PM2] Log streaming started')

  bus.on('log:out', packet => {
    console.log('[App:%s] %s', packet.process.name, packet.data)
  })

  bus.on('log:err', packet => {
    console.error('[App:%s][Err] %s', packet.process.name, packet.data)
  })
}

pm2.connect(() => {
  pm2.start({
    script: './app.js',
    name: '312-dev-prod',
    exec_mode: 'cluster',
    instances,
    max_memory_restart: `${maxMemory}M`,
  }, err => {
    if (err) return console.error('Error while launching applications', err.stack || err)
    console.log('PM2 and application has been succesfully started')
    pm2.launchBus(cb1)
  })
})
