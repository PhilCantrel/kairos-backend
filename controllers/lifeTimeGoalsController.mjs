// Imports utility functions
import {getUserLTGoals, addUserLTGoal, getLTGoalById,
        updateLTGoal, deleteLTGoal} from '../utils/lifetimeGoalsUtils.mjs'

// DRY implementation of error handling
const errorHandling = function(res, err, code) {
    res.status(code)
    return res.json({error: err.message})
}

// Sends all life time goals currently in the database
const getLTGoals = function (req, res) {
    getUserLTGoals(req).exec((err, goals) => {
        err ? errorHandling(res, err, 500) : res.send(goals)
    })
}

// Sends one life time goal (found by ID)
const getLTGoal = function (req, res) {
    getLTGoalById(req.params.id).exec((err, goal) => {
        
        if (err) {
            errorHandling(res, err, 404) 
            } else { 
                try {
                    if (goal) {
                        res.send(goal)
                    } else {
                        res.status(404)
                        return res.json("error: life time goal no longer exists")
                    }
                } catch (e) {
                    console.log(e)
                }
            }
    })
}

// Updates ones life time goal (found by ID) and sends updated goal
const modifyLTGoal = function (req, res) {
    updateLTGoal(req).exec((err, goal) => {
        err ? errorHandling(res, err, 404) : res.send(goal), res.status(200)
    })
}


// Deletes one life time goal (found by ID)
const removeLTGoal = function (req, res) {
    deleteLTGoal(req.params.id).exec((err) => {
        err ? errorHandling(res, err, 404) : res.sendStatus(204)
    })
}

// Saves new life time goal to database and displays it
const newLTGoal = function (req, res) {
    addUserLTGoal(req).save((err, goal) => {
        err ? errorHandling(res, err, 500) : res.send(goal)
    })
}

// Exports controller functions for use in router
export {getLTGoals, getLTGoal, newLTGoal, modifyLTGoal, removeLTGoal}