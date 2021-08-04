// Imports mongoose and defines the mongoose Schema
import mongoose from 'mongoose'
import normalize from 'normalize-mongoose'
const Schema = mongoose.Schema


// Defines the Goal model/object
const LifetimeGoal = new Schema({
    type: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    },
    editedAt: {
        type: Date,
        required: true
    },
    userId: {
        type: String,
        required: true
    }
})

// Removes _ from id and deletes v property from model
LifetimeGoal.plugin(normalize)

// Exports the Goal model

export default mongoose.model('LifetimeGoal', LifetimeGoal)
