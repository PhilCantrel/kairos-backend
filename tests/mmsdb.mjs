// Sets up a temporary 'in memory' mongodb server

import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'

const mongod = await MongoMemoryServer.create()


// connect
const dbConnect = async () => {
    const uri = mongod.getUri()
    const mongooseOptions = {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    }
    await mongoose.connect(uri, mongooseOptions)
}

// disconnect and close connections
const dbDisconnect = async () => {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
    await mongod.stop()
}

// export functions
export {dbConnect, dbDisconnect}