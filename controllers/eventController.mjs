import Goal from '../models/goal.mjs'
import Event from '../models/event.mjs'
import moment from 'moment'
import { getUserEvents, getGoalEvents, getEventById, updateEvent, deleteEvent, addUserEvent } from '../utils/eventUtils.mjs'

const errorHandling = function(res, err, code) {
    res.status(code)
    return res.json({error: err.message})
}

// Basic CRUD

// Create new event to database and display it
const newEvent = function (req, res){
    addUserEvent(req).save()
        .then(newEvent => {

            //loop through the attached goals for newEvent and the event Id
            // each goal's eventsId field.
            if(newEvent.goalsId.length > 0){
                console.log('The new event:', newEvent._id)
                newEvent.goalsId.forEach( goalId =>{
                    console.log(newEvent._id)
                    Goal.findByIdAndUpdate(goalId._id,
                        {$push: {eventsId: newEvent._id}},
                        {safe: true, upsert: true},
                        function(err) { if(err){ console.log(err) } })
                })
            }
            Event.populate(newEvent,{path:'goalsId', select:{title:1}})
            .then(nE => {
                res.send(nE)
            })
        })
        .catch(err => errorHandling(res, err, 500))
}

// Read all events
const getEvents = function(req, res){
    getUserEvents(req).exec((err, events) =>{
        err ? errorHandling(res, err, 500) : res.send(events)
    })
}
// Read single event
const getEvent = function(req,res) {
    getEventById(req.params.id)
        .populate('goalsId')
        .exec((err, event) => {
        if(err) {
            errorHandling(res,err, 404)
        } else {
            try {
                if(event){
                    res.send(event)
                } else {
                    res.status(404)
                    return res.json("error: event no longer exists")
                }
            } catch(e){
                console.log(e)
            }
        }
    })
}

// Update one event (found by Id) and sends updated event
const modifyEvent = function (req, res){
    updateEvent(req).exec((err, event) => {
        err ? errorHandling(res, err, 404) : res.send(event), res.status(200)
    })
}

// Delete one event (by id)
const removeEvent = function(req, res){
    deleteEvent(req.params.id).exec(err => {
        err ? errorHandling(res, err, 404) : res.sendStatus(204)
    })
}

// Get event by Day ?
const getEventByDay = function(req, res){
    let date = moment(req.params.data).toISOString()
    let date2 = moment(req.params.data).add(1, 'day').toISOString()
    Event.find({
        userId: req.user.id,
        eventStart : { 
          $gt: new Date(date), 
          $lt: new Date(date2)
        } 
       }).exec((err, events) => {
            err ? errorHandling(res, err, 404) : res.send(events)
       })
}

// Possible endpoint. But maybe not needed.
const getEventsByGoal = function(req,res){
    getGoalEvents(req).exec((err, events) =>{
        err ? errorHandling(res, err, 500) : res.send(events)
    })
}

// export controller for use in router
export {getEvents, getEvent, modifyEvent, removeEvent, newEvent, getEventsByGoal, getEventByDay}