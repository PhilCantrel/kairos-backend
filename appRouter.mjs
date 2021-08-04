// Imports express library and controller functions
import express from 'express'
import {getGoals, getGoal, newGoal,
        modifyGoal, removeGoal} from './controllers/goalsController.mjs'
import {getLTGoals, getLTGoal, newLTGoal,
        modifyLTGoal, removeLTGoal} from './controllers/lifeTimeGoalsController.mjs'
import {signUp, signIn, loginCheck} from './controllers/authController.mjs'

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

// Exports the router
export {router}
