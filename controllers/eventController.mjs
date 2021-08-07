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
    addUserEvent(req)
        .save((err, event) => {
            if(err){
                errorHandling(res, err, 500)
            }else{
                // console.log("event.id:",event.id)
                // console.log("goalsId:", event.goalsId)
                
                event.goalsId.forEach(g => {
                    // console.log('current event.goalsId instance',g)
                    Goal.findByIdAndUpdate(
                        g,
                        {$push: {eventsId: event.id} },
                        )
                    // console.log('new event.goalsId:',g.eventsId)
                  })

                // console.log(event)
            }
            res.send(event)
    })
}

// Read all events
const getEvents = function(req, res){
    getUserEvents(req).exec((err, events) =>{
        err ? errorHandling(res, err, 500) : res.send(events)
    })
}
// Read single event
const getEvent = function(req,res) {
    console.log(req.body)
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
    console.log(date, date2)
    Event.find({ 
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