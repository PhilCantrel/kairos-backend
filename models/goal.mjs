// Imports mongoose and defines the mongoose Schema
import mongoose from 'mongoose'
import normalize from 'normalize-mongoose'
const Schema = mongoose.Schema


// Defines the Goal model/object
const Goal = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    timeframe: {
        type: String,
        required: true
    },
    endDate: {
        type: Date,
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
    completedAt: {
        type: Date,
        required: false
    },
    userId: {
        type: String,
        required: true
    },
    lTGoalsId: {
        type: Array,
        required: false
    },
    eventsId: {
        type: Array,
        required: false
    }
})

// Removes _ from id and deletes v property from model
Goal.plugin(normalize)

// Exports the Goal model

export default mongoose.model('Goal', Goal)