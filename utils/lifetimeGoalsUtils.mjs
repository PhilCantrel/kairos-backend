// Import LifeTimeGoal model
import LifetimeGoal from '../models/lifetimeGoal.mjs'

let date = Date.now()

// Returns all life time goals in the database
const getUserLTGoals = function (req) {
    return LifetimeGoal.find({userId: req.user.id})
}

// Return life tiem goal by ID
const getLTGoalById = function (id){
    try {
        return LifetimeGoal.findById(id)
    } catch (e) {
        console.log(`lifetimeGoalUtils => getLTGoalById Error: ${e.message}`)
    }
}

// Adds Created and Edited date to the request body and returns it
const addUserLTGoal = function (req){
    try {
        req.body.userId = req.user.id
        req.body.createdAt = date
        req.body.editedAt = date
        return LifetimeGoal(req.body)
    } catch (e) {
        console.log(`lifetimeGoalUtils => addUserLTGoal Error: ${e.message}`)
    }
    
}

// Deletes life time goal from the database by ID
const deleteLTGoal = function (id) {
    try {
        return LifetimeGoal.findByIdAndRemove(id)
    } catch (e) {
        console.log(`lifetimeGoalUtils => deleteLTGoal Error: ${e.message}`)
    }
}

// Updates the life tiem goal by ID and returns it
const updateLTGoal = function (req) {
    try {
        req.body.editedAt = date
        return LifetimeGoal.findByIdAndUpdate(req.params.id, req.body, {new: true})
    } catch (e) {
        console.log(`lifetimeGoalUtils => updateLTGoal Error: ${e.message}`)
    }
}



// exports LifetimeGoals utility functions
export {getUserLTGoals, addUserLTGoal, getLTGoalById, updateLTGoal, deleteLTGoal}
