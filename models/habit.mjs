// Import mongoose, define schema, normalise Id's for client
import mongoose from 'mongoose'
import normalize from 'normalize-mongoose'
const Schema = mongoose.Schema

// Event Definition:
const Habit = new Schema({
    title:{
        type: String,
        required: true
    },
    description:{
      type: String,
      required: true  
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now()
    },
    editedAt: {
        type: Date,
        required: true,
        default: Date.now()
    },
    startDate:{
        type: Date,
        required: true
    },
    endDate:{
        type: Date,
        required: true
    },
    DWMY:{
        type: String,
        required: true
    },
    active: {
        type:Boolean,
        required: true,
        default: true
    },
    eventIds: [{
        type: Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    }],
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'}
})

Habit.plugin(normalize)

export default mongoose.model('Habit', Habit)