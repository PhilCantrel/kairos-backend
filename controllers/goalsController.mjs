// Imports utility functions
import {getUserGoals, addUserGoal, getGoalById,
        updateGoal, deleteGoal} from '../utils/goalsUtils.mjs'

// DRY implementation of error handling
const errorHandling = function(res, err, code) {
    res.status(code)
    return res.json({error: err.message})
}

// Sends all goals currently in the database
const getGoals = function (req, res) {
    getUserGoals(req).exec((err, goals) => {
        err ? errorHandling(res, err, 500) : res.send(goals)
    })
}

// Sends one Goal (found by ID)
const getGoal = function (req, res) {
    getGoalById(req.params.id).exec((err, goal) => {
        
        if (err) {
            errorHandling(res, err, 404) 
            } else { 
                try {
                    if (goal) {
                        res.send(goal)
                    } else {
                        res.status(404)
                        return res.json("error: goal no longer exists")
                    }
                } catch (e) {
                    console.log(e)
                }
            }
    })
}

// Updates ones goal (foudn by ID) and sends updated goal
const modifyGoal = function (req, res) {
    updateGoal(req).exec((err, goal) => {
        err ? errorHandling(res, err, 404) : res.send(goal), res.status(200)
    })
}


// Deletes one Goal (found by ID)
const removeGoal = function (req, res) {
    deleteGoal(req.params.id).exec((err) => {
        err ? errorHandling(res, err, 404) : res.sendStatus(204)
    })
}

// Saves new goal to database and displays it
const newGoal = function (req, res) {
    addUserGoal(req).save((err, goal) => {
        err ? errorHandling(res, err, 500) : res.send(goal)
    })
}

// Exports controller functions for use in router
export {getGoals, getGoal, newGoal, modifyGoal, removeGoal}