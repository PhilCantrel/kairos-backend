// Imports required libraries

import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

// Defines constants

const port = 4000

// Defines app object

const app = express()

// Converts requests to JSON

app.use(express.urlencoded({extended: true}));
app.use(express.json())







// Express service listener

app.listen(port, ()=>{console.log(`Kairos server running on port ${port}`)})


