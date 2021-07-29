// Imports express library and controller functions
import express from 'express'
import {getGoals, getGoal, newGoal, modifyGoal, removeGoal} from './controllers/goalsController.mjs'

// Defines the express router
const router = express.Router()

router.get('/', (req, res) => {
    res.send('home')
})

// CRUD routes for goals
router.get('/goals', getGoals)
router.get('/goals/:id', getGoal)
router.post('/goals', newGoal)
router.put('/goals/:id', modifyGoal)
router.delete('/goals/:id', removeGoal)


// Exports the router
export {router}
