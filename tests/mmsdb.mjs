// Sets up a temporary 'in memory' mongodb server

import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'

const mongod = await MongoMemoryServer.create()


// connect
const dbConnect = async () => {
    try {
        const uri = mongod.getUri()
        const mongooseOptions = {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        }
        await mongoose.connect(uri, mongooseOptions)
    }catch (e) {
        console.log(`dbConnection Error: ${e.message}`)
    }
}
// drop database

const dbDrop = async () => {
    await mongoose.connection.dropDatabase()
}

// disconnect and close connections
const dbDisconnect = async () => {
    await mongoose.connection.close()
    await mongod.stop()
}

// export functions
export {dbConnect, dbDisconnect, dbDrop}