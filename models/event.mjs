// Import mongoose, define schema, normalise Id's for client
import mongoose from 'mongoose'
import normalize from 'normalize-mongoose'
const Schema = mongoose.Schema
import autopopulate from 'mongoose-autopopulate'

// Event Definition:
const Event = new Schema({
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
    eventStart:{
        type: Date,
        required: true
    },
    eventEnd:{
        type: Date,
        required: true
    },
    completed:{
        type: Boolean,
        required: false
    },
    checklist: {
        type: Array,
        required: false
    },
    location: {
        type: String,
        required: false
    },
    url: {
        type: String,
        required: false
    },
    userId: {
        type: String,
        required: true
    },
    habitId: {
        type: String,
        required: false
    },
    goalsId: [{
        type: Schema.Types.ObjectId,
        ref: 'Goal',
        autopopulate: { select: 'title' }
    }]
})

Event.plugin(autopopulate, {
    functions: ['find', 'findOne', 'findById']
})

Event.plugin(normalize)

export default mongoose.model('Event', Event)