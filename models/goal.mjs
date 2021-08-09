// Imports mongoose and defines the mongoose Schema
import mongoose from 'mongoose'
import normalize from 'normalize-mongoose'
const Schema = mongoose.Schema


// Defines the Goal model/object
const Goal = new Schema({
    title: {
        type: String,
        required: [true, 'title is required']
    },
    description: {
        type: String,
        required: [true, 'description is missing']
    },
    timeframe: {
        type: String,
        required: [true, 'no timeframe specified']
    },
    endDate: {
        type: Date,
        required: [true, 'must have an end date']
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        required: [true, 'createdAt was not created']
    },
    editedAt: {
        type: Date,
        default: Date.now(),
        required: [true, 'editedAt was not created']
    },
    completedAt: {
        type: Date,
        required: false
    },
    userId: {
        type: String,
        required: [true, 'userId not added to goal']
    },
    lTGoalsId: [{
        type: Schema.Types.ObjectId,
        ref: "LifetimeGoal",
        autopopulate: { select: 'type' },
        required: true
    }],
    eventsId: {
        type: Array,
        required: false
    }
})


// Removes _ from id and deletes v property from model
Goal.plugin(normalize)

// Exports the Goal model

export default mongoose.model('Goal', Goal)