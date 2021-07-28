// Imports required libraries
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

// Defines port number
const port = 4000

// Defines Local Mongoose DB location
const dbConn = 'mongodb://localhost/kairos_db'

// Defines app object
const app = express()

// Converts requests to JSON
app.use(express.urlencoded({extended: true}));
app.use(express.json())

// Enables CORS (Cross-origin Resource Sharing) so requests can skip the Same-origin policy
// (https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy)
app.use(cors())

// Mongoose database connection
mongoose.connect(dbConn,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    },
    error => {
        if (error){
            console.log("Mongoose Database Connection Failed:", error)
        } else {
            console.log("Successfully Connected to Mongoose Database")
        }
    })

app.get('/', (req, res) => {
    res.send('home')
})








// Express service listener
app.listen(port, ()=>{console.log(`Kairos server running on port ${port}`)})


