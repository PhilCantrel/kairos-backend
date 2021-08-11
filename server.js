import {app} from './app.mjs'
import mongoose from 'mongoose'


// Defines port number
const port = process.env.PORT || 4000

// Defines Local Mongoose DB location
const dbConn = 'mongodb://localhost/kairos_db'

// Express service listener
app.listen(port, ()=>{console.log(`Kairos server running on port ${port}`)})

// Mongoose database connection
mongoose.connect(dbConn,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    },
    err => {
        if (err){
            console.log("Mongoose database connection failed:", err)
        } else {
            console.log("Successfully connected to mongoose database")
        }
    })