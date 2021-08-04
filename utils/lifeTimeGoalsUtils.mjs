// Import LifeTimeGoal model
import LifeTimeGoal from '../models/lifeTimeGoal.mjs'

let date = Date.now()

// Returns all life time goals in the database
const getUserLTGoals = function (req) {
    return LifeTimeGoal.find({userId: req.user.id})
}

// Return life tiem goal by ID
const getLTGoalById = function (id){
    try {
        return LifeTimeGoal.findById(id)
    } catch (e) {
        console.log(`lifeTimeGoalUtils => getLTGoalById Error: ${e.message}`)
    }
}

// Adds Created and Edited date to the request body and returns it
const addUserLTGoal = function (req){
    try {
        req.body.userId = req.user.id
        req.body.createdAt = date
        req.body.editedAt = date
        return LifeTimeGoal(req.body)
    } catch (e) {
        console.log(`lifeTimeGoalUtils => addUserLTGoal Error: ${e.message}`)
    }
    
}

// Deletes life time goal from the database by ID
const deleteLTGoal = function (id) {
    try {
        return LifeTimeGoal.findByIdAndRemove(id)
    } catch (e) {
        console.log(`lifeTimeGoalUtils => deleteLTGoal Error: ${e.message}`)
    }
}

// Updates the life tiem goal by ID and returns it
const updateLTGoal = function (req) {
    try {
        req.body.editedAt = date
        return LifeTimeGoal.findByIdAndUpdate(req.params.id, req.body, {new: true})
    } catch (e) {
        console.log(`lifeTimeGoalUtils => updateLTGoal Error: ${e.message}`)
    }
}



// exports LifeTimeGoals utility functions
export {getUserLTGoals, addUserLTGoal, getLTGoalById, updateLTGoal, deleteLTGoal}