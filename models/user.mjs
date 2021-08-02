// Imports mongoose and defines the mongoose Schema
import mongoose from 'mongoose'
import normalize from 'normalize-mongoose'
import bcrypt from 'bcrypt'

const Schema = mongoose.Schema

const User = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    hashed_password : {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
    },
    editedAt: {
        type: Date,
        required: true,
    },
    lTGoalsId: {
        type: Array,
        required: false
    },
    goalsId: {
        type: Array,
        required: false
    },
    habitsId: {
        type: Array,
        required: false
    },
    avatar : {
        type: Number,
        required: true
    }


})

// Removes _ from id and deletes v property from model
User.plugin(normalize)

// Exports the User model

export default mongoose.model('User', User)


