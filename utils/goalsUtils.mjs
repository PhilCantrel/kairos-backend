// Import Goal model
import Goal from '../models/goals.mjs'

// Returns all goals in the database
const getUserGoals = function () {
    return Goal.find()
}

// Adds Created and Edited date to the request body and returns it
const addUserGoal = function (req){
    let date = Date.now()
    req.body.createdAt = date
    req.body.editedAt = date
    return Goal(req.body)
}

// exports Goals utility functions
export {getUserGoals, addUserGoal}