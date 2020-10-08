import mongoose from 'mongoose'
import config from '../config'

export const connect = (url = config.serverDb, opts = {}) => {
    return mongoose.connect(
      url,
      { ...opts, useNewUrlParser: true }
    )
  }