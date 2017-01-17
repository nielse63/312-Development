/* eslint-disable no-console */

const pm2 = require('pm2')

const instances = process.env.WEB_CONCURRENCY || 1
const maxMemory = process.env.WEB_MEMORY || 512
const ENV = process.env.NODE_ENV || 'development'

const logger = (err, bus) => {
  console.log('[PM2] Log streaming started')

  bus.on('process:event', (packet) => {
    if(packet.event === 'exit') {
      process.exit(0)
    }
  })

  bus.on('log:out', packet => {
    console.log('[App:%s] %s', packet.process.name, packet.data)
  })

  bus.on('log:err', packet => {
    console.error('[App:%s][Err] %s', packet.process.name, packet.data)
  })
}

pm2.connect(true, error => {
  if (error) {
    console.error('[PM2 Error] %s', error)
    process.exit(2)
  }

  pm2.start({
    script: 'index.js',
    name: `312:${ENV}`,
    exec_mode: 'cluster',
    instances,
    max_memory_restart: `${maxMemory}M`,
    env: {
      NODE_ENV: ENV,
    },
  }, err => {
    if (err) {
      throw new Error('Error while launching applications', err.stack || err)
    }
    console.log('[PM2] Application has been succesfully started')
    return pm2.launchBus(logger)
  })
})
