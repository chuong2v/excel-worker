import config from 'config'
import mongoose from 'mongoose'
import Promise from 'bluebird'
mongoose.Promise = Promise
import nodeUtil from 'node-utility'
import path from 'path'

config.mongo.debug && mongoose.set('debug', true)

export default () => {
  return mongoose.connect(config.mongo.uri, config.mongo.options).then(() => {
    nodeUtil.load(path.resolve(__dirname, './../lib/model'))
    console.log('MongoDB has been connected successfully')
  })
}