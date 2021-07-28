// Imports mongoose and defines the mongoose Schema
import mongoose from 'mongoose'
const Schema = mongoose.Schema

// Defines the Goal model/object
const Goal = new Schema({
    title = {
        type: String,
        required: true
    },
    description = {
        type: String,
        required: true
    },
    timeframe = {
        type: String,
        required: true
    },
    endDate ={
        type: String,
        required: true
    },
    createdAt = {
        type: Date,
        required: true
    },
    lastEdited = {
        type: Date,
        required: true
    },
    completedAt = {
        type: Date,
        required: false
    },
    lifetimeGoal = {
        type: Array,
        required: true
    },
    eventsId = {
        type: Array,
        required: false
    }
})

// Expots the Goal object
module.exports = mongoose.model('Goal', Goal)