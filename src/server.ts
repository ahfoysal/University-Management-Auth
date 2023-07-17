import mongoose from 'mongoose';
import app from './app';
import config from './config';


//////Database Connection
async function connectDB () {
    try {
        await mongoose.connect(config.database_url as string)
        console.log("MongoDB Connected")

        app.listen(config.port, () => {
            console.log(`Server listening on port ${config.port}`)
          })
          
        
    }catch(err) {
        console.log( 'failed to connect database',err)
            }

    }
    connectDB()

