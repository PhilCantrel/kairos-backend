// Imports express library and getGoals controller function.
import express from 'express'
import {getGoals} from './controllers/goalsController.mjs'

// Defines the express router
const router = express.Router()

router.get('/', (req, res) => {
    res.send('home')
})

// Routes the /goals path
router.get('/goals', getGoals)

export {router}
