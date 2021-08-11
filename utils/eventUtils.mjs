import Event from '../models/event.mjs'
import Goal from '../models/goal.mjs'

const getUserEvents = function(req) {
    return Event.find({userId: req.user.id})
}

const GetGoalEvents = function(req) {
    return Event.find({goalsId: req.goal.id})
}

const getEventById = function(id){
    try{
        return Event.findById(id)
    } catch(e){
        console.error(`eventUtils => getEventById Error: ${e.message}`)
    }
}

const addUserEvent = function(req){
    try{
        req.body.userId = req.user.id
        return Event(req.body)
    } catch(e){
        console.error(`eventUtils => addUserEvent Error: ${e.message}`)
    }
}

const deleteEvent = function(id){
    try{
        return Event.findByIdAndRemove(id)
    } catch(e){
        console.log(`eventUtils => deleteEvent Error: ${e.message}`)
    }
}


const updateEvent = function(req){
    try{
        req.body.editedAt = Date.now()
        return Event.findByIdAndUpdate(req.params.id, req.body)
    }catch(e){
        console.log(`eventUtils => updateEvent Error: ${e.message}`)
    }
}

// not even sure this is needed, tbh... but I made it.
const getGoalEvents = function(id){
    try {
        return Event.find({goalsId: id})
    }catch(e){
        console.error(`errorUtils => getEventByGoal Error: ${e.message}`)
    }
}

export { getUserEvents, GetGoalEvents, addUserEvent, getEventById, getGoalEvents, deleteEvent, updateEvent}