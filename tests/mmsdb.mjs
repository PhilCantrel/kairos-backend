// Sets up a temporary 'in memory' mongodb server

import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'

const mongoms = new MongoMemoryServer();

// connect
const connect = async () => {
    const uri = mongoms.getUri()
    const mongooseOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        poolSize: 10
    }
    await mongoose.connect(uri, mongooseOptions)
}

// disconnect and close connections
const disconnect = async () => {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
    await mongoms.stop()
}

// erase temporary database data
const erase = async () => {
    const collections = mongoose.connection.collections
    for (const key in collections) {
        const collection = collections[key]
        await collection.deleteMany()
    }
}

// export functions
export {connect, disconnect, erase}