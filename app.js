const express = require('express');
const app = express();
const auth = require('./routes/auth')

const dotenv = require('dotenv');
const mongoose = require('mongoose')
dotenv.config()

mongoose.connect(process.env.mongo_url).then(()=>{console.log('mongodb connected.')}).catch((err)=>{console.log('Error occured'+err)})


app.use(express.json())

app.use('/',auth)
app.get('/',(req,res)=>{
    res.send("hello auth")
})


const port = 7001;
app.listen(port,()=>{
    console.log(`running on port:${port}`)
})