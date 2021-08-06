// Imports express library and controller functions
import express from 'express'
import {getGoals, getGoal, newGoal,
        modifyGoal, removeGoal} from './controllers/goalsController.mjs'
import {getLTGoals, getLTGoal, newLTGoal,
        modifyLTGoal, removeLTGoal} from './controllers/lifetimeGoalsController.mjs'
import {signUp, signIn, loginCheck} from './controllers/authController.mjs'
import {getEvents, newEvent, getEvent,
        removeEvent, modifyEvent, getEventsByGoal} from './controllers/eventController.mjs'

// Defines the express router
const router = express.Router()


// Auth/User routes
router.post('/sign_up', signUp)
router.post('/sign_in', signIn)

// required login for all routes under this line
router.use(loginCheck)

// CRUD routes for life time goals
router.get('/ltgoals', getLTGoals)
router.get('/ltgoals/:id', getLTGoal)
router.post('/ltgoals', newLTGoal)
router.put('/ltgoals/:id', modifyLTGoal)
router.delete('/ltgoals/:id', removeLTGoal)

// CRUD routes for goals
router.get('/goals', getGoals)
router.get('/goals/:id', getGoal)
router.post('/goals', newGoal)
router.put('/goals/:id', modifyGoal)
router.delete('/goals/:id', removeGoal)

// CRUD routes for events
router.get('/events', getEvents)
router.get('/events/:id', getEvent)
router.post('/events', newEvent)
router.put('/events/:id', modifyEvent)
router.delete('/events/:id', removeEvent)

// Exports the router
export {router}
