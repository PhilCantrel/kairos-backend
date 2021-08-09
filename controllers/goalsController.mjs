// Imports utility functions
import Goal from '../models/goal.mjs'
import {getUserGoals, addUserGoal, getGoalById,
        updateGoal, deleteGoal} from '../utils/goalsUtils.mjs'

// DRY implementation of error handling
const errorHandling = function(res, err, code) {
    res.status(code)
    console.error(err)
    return res.json(err)
}

// Sends all goals currently in the database
const getGoals = function (req, res) {
    getUserGoals(req, (err, goals) => {
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

// Updates ones goal (found by ID) and sends updated goal
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

// Saves new goal to database and displays it.
// Changed to using a promise, because I couldn't get the callback to populate
const newGoal = function (req, res) {
    // https://dev.to/paras594/how-to-use-populate-in-mongoose-node-js-mo0
    addUserGoal(req).save()
        .then( goal =>{
            Goal
                .populate(goal,{path: 'lTGoalsId', select: {type: 1}})
                .then( g =>
                res.send(g))
        })
        .catch(err => errorHandling(res, err, 500))
}

// Exports controller functions for use in router
export {getGoals, getGoal, newGoal, modifyGoal, removeGoal}