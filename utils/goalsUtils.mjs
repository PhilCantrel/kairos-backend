// Import Goal model
import Goal from '../models/goals.mjs'

// Returns all goals in the database
const getUserGoals = function () {
    return Goal.find()
}

// Return Goal by ID
const getGoalById = function (id){
    return Goal.findById(id) 
}

// Adds Created and Edited date to the request body and returns it
const addUserGoal = function (req){
    let date = Date.now()
    req.body.createdAt = date
    req.body.editedAt = date
    return Goal(req.body)
}

// Deletes goal from the database by ID
const deleteGoal = function (id) {
    return Goal.findByIdAndRemove(id)
}

// Updates the Goal by ID and returns it
const updateGoal = function (req) {
    req.body.editedAt = Date.now()
    return Goal.findByIdAndUpdate(req.params.id, req.body, {new: true})
}



// exports Goals utility functions
export {getUserGoals, addUserGoal, getGoalById, updateGoal, deleteGoal}