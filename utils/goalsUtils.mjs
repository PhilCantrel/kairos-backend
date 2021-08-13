// Import Goal model
import Goal from '../models/goal.mjs'
import LifetimeGoal from '../models/lifetimeGoal.mjs'

let date = Date.now()

// Returns all goals in the database
const getUserGoals = function (req, cb) {
    return Goal.find({userId: req.user.id})
        .populate("lTGoalsId", {type: 1, _id: 1})
        .exec(cb)
}

// Return Goal by ID
const getGoalById = function (id){
    try {
        return Goal.findById(id)
    } catch (e) {
        console.log(`goalUtils => getGoalById Error: ${e.message}`)
    }
}

const constructEndDate = (date, monthsToAdd)=>{
    const ms = monthsToAdd.split(' ')
    const x = Number(ms[0])
    const p = ms[1]
    const d = new Date(date)

    switch (String(p)) {
        case 'day':
        case 'days':{
            let y = new Date(d).getDate() + x
            return d.setDate(y)
        }
        case 'week':
        case 'weeks':{
            let y = d.getDate() + (x * 7)
            return d.setDate(y)
        }
        case 'month':
        case 'months':{
            let y = d.getMonth() + x
            return d.setMonth(y)
        }
        case 'year':
        case 'years':{
            let c = d.getFullYear()
            let cd = c + x
            return d.setYear(cd)
        }
        default:
            break;
    }
}

// Adds Created and Edited date to the request body and returns it
const addUserGoal = function (req){
    try {
        req.body.userId = req.user.id
        req.body.createdAt = Date.now()
        req.body.editedAt = req.body.createdAt
        req.body.endDate = constructEndDate(req.body.createdAt, req.body.timeframe)
        return Goal(req.body)
    }
    catch (e) {
        console.error(`goalUtils => addUserGoal Error: ${e.message}`)
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
        return Goal.findByIdAndUpdate(req.body.id, req.body, {new: true})
    } catch (e) {
        console.log(`goalUtils => updateGoal Error: ${e.message}`)
    }
}



// exports Goals utility functions
export {getUserGoals, addUserGoal, getGoalById, updateGoal, deleteGoal}