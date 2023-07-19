import mongoose from 'mongoose'
import app from './app'
import config from './config'
import { logger } from './shared/logger'

//////Database Connection
async function connectDB() {
  try {
    await mongoose.connect(config.database_url as string)
    logger.info('MongoDB Connected')

    app.listen(config.port, () => {
      logger.info(`Server listening on port ${config.port}`)
    })
  } catch (err) {
    logger.error('failed to connect database', err)
  }
}
connectDB()
