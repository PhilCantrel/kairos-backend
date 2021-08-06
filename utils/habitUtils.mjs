import Habit from '../models/habit.mjs'

const getUserHabits = function(req) {
    return Habit.find({userId: req.user.id})
}

const getHabitById = function(id){
    try{
        return Habit.findById(id)
    } catch(e){
        console.error(`habitUtils => getHabitById Error: ${e.message}`)
    }
}

const addUserHabit = function(req){
    try{
        req.body.userId = req.user.id
        return Habit(req.body)
    } catch(e){
        console.error(`habitUtils => addUserHabit Error: ${e.message}`)
    }
}

const deleteHabit = function(id){
    try{
        return Habit.findByIdAndRemove(id)
    } catch(e){
        console.log(`habitUtils => deleteHabit Error: ${e.message}`)
    }
}

const updateHabit = function(req){
    try{
        req.body.editedAt = Date.now()
        return Habit.findByIdAndUpdate(req.params.id, req.body, {new: true})
    }catch(e){
        console.log(`habitUtils => updateHabit Error: ${e.message}`)
    }
}

export { getUserHabits, addUserHabit, getHabitById, deleteHabit, updateHabit }