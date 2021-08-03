// Import Goal model
import Goal from '../models/goal.mjs'

let date = Date.now()

// Returns all goals in the database
const getUserGoals = function (req) {
    return Goal.find({userId: req.user.id})
}

// Return Goal by ID
const getGoalById = function (id){
    try {
        return Goal.findById(id)
    } catch (e) {
        console.log(`goalUtils => getGoalById Error: ${e.message}`)
    }
}

// Adds Created and Edited date to the request body and returns it
const addUserGoal = function (req){
    try {
        req.body.userId = req.user.id
        req.body.createdAt = date
        req.body.editedAt = date
        return Goal(req.body)
    } catch (e) {
        console.log(`goalUtils => addUserGoal Error: ${e.message}`)
    }
    
}

// Deletes goal from the database by ID
const deleteGoal = function (id) {
    try {
        return Goal.findByIdAndRemove(id)
    } catch (e) {
        console.log(`goalUtils => deleteGoal Error: ${e.message}`)
    }
}

// Updates the Goal by ID and returns it
const updateGoal = function (req) {
    try {
        req.body.editedAt = date
        return Goal.findByIdAndUpdate(req.params.id, req.body, {new: true})
    } catch (e) {
        console.log(`goalUtils => updateGoal Error: ${e.message}`)
    }
}



// exports Goals utility functions
export {getUserGoals, addUserGoal, getGoalById, updateGoal, deleteGoal}