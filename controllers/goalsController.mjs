// Imports utility functions
import {getUserGoals, addUserGoal} from '../utils/goalsUtils.mjs'

// DRY implementation of error handling
const errorHandling = function(err, code) {
    res.status(code)
    return res.json({error: err.message})
}

// Displays all goals currently in the database
const getGoals = function (req, res) {
    getUserGoals(req).exec((err, goals) => {
        err ? errorHandling(err, 500) : res.send(goals)
    })
}

// Saves new goal to database and displays it
const newGoal = function (req, res) {
    addUserGoal(req).save((err, goal) => {
        err ? errorHandling(err, 500) : res.send(goal)
    })
}

// Exports controller functions for use in router
export {getGoals, newGoal}