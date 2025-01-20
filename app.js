const express = require('express');
const app = express();
const auth = require('./routes/auth')
const dashboardRouter = require('./routes/dashboard')
const dotenv = require('dotenv')
dotenv.config()
app.use(express.json())

app.use('/api/auth',auth)



const port = 7002;
app.listen(port,()=>{
    console.log(`running on port:${port}`)
})