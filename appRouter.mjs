// Imports express library and getGoals controller function.
import express from 'express'
import {getGoals, newGoal} from './controllers/goalsController.mjs'

// Defines the express router
const router = express.Router()

router.get('/', (req, res) => {
    res.send('home')
})

// CRUD routes for goals
router.get('/goals', getGoals)
router.post('/goals', newGoal)

// Exports the router
export {router}
