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
    lTGoalId: {
        type: Array,
        required: false
    },
    eventsId: {
        type: Array,
        required: false
    }
})

Goal.plugin(normalize)

// Expots the Goal object

export default mongoose.model('Goal', Goal)