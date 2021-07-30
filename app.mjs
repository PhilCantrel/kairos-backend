// Imports required libraries
import express from 'express'
import cors from 'cors'

// Imports the router
import {router as appRouter} from './appRouter.mjs'

// Defines app object
const app = express()

// Converts requests to JSON
app.use(express.urlencoded({extended: true}));
app.use(express.json())

// Enables CORS (Cross-origin Resource Sharing) so requests can skip the Same-origin policy
// (https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy)
app.use(cors())


// Uses all routing specified in appRouter.js
app.use("/", appRouter)

// Exports app for use in server.js
export {app}


