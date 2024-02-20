const express = require('express')
const app = express()
const cors = require('cors')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
dotenv.config()

app.use(cors())
app.use(express.json())

const blog = require('./routes/router')
const { dbUrl } = require('./config/dbConfig')

app.use('/', blog)

app.get('/', (req,res)=>{
    res.send("<h1>welcome server</h1>")
})

mongoose.connect(dbUrl, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
});

const PORT = process.env.PORT 

app.listen(PORT, ()=>console.log('App running port ' + PORT))