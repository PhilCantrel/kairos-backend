import { getUserHabits, getHabitById, updateHabit, deleteHabit, addUserHabit } from '../utils/habitUtils.mjs'

const errorHandling = function(res, err, code) {
    res.status(code)
    return res.json({error: err.message})
}

// Basic CRUD

// Create new habit to database and display it
const newHabit = function (req, res){
    addUserHabit(req)
        .save((err, habit) => {
            err ? errorHandling(res, err, 500) : res.send(habit)
        })
}

// Read all habits
const getHabits = function(req, res){
    getUserHabits(req).exec((err, habits) =>{
        err ? errorHandling(res, err, 500) : res.send(habits)
    })
}
// Read single habit
const getHabit = function(req,res) {
    getHabitById(req.params.id)
        .populate('eventsId')
        .exec((err, habit) => {
        if(err) {
            errorHandling(res,err, 404)
        } else {
            try {
                if(habit){
                    res.send(habit)
                } else {
                    res.status(404)
                    return res.json("error: habit no longer exists")
                }
            } catch(e){
                console.log(e)
            }
        }
    })
}

// Update one habit (found by Id) and sends updated habit
const modifyHabit = function (req, res){
    updateHabit(req).exec((err, habit) => {
        err ? errorHandling(res, err, 404) : res.send(habit), res.status(200)
    })
}

// Delete one habit (by id)
const removeHabit = function(req, res){
    deleteHabit(req.params.id).exec(err => {
        err ? errorHandling(res, err, 404) : res.sendStatus(204)
    })
}

// Possible endpoint. But maybe not needed.
// const getHabitsByGoal = function(req,res){
//     getGoalHabits(req).exec((err, habits) =>{
//         err ? errorHandling(res, err, 500) : res.send(habits)
//     })
// }

// export controller for use in router
export {getHabits, getHabit, modifyHabit, removeHabit, newHabit}