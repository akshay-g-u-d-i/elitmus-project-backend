require('dotenv').config()
var cors = require('cors')
const express = require('express')
const { mongodb }  = require('./database')
const app = express()
const port = process.env.PORT || 5000
const createuser = require('./routes/createuser')
const loginuser = require('./routes/loginuser')
const submitanswers = require('./routes/submitanswers')
const getdata = require('./routes/getdata')
const getregdata = require('./routes/getregdata')



mongodb()

app.use(cors())

app.use(express.json())

app.get('/', (req, res)=>{
    res.send("Hello front-end, this is back-end")
})

app.listen(port, ()=>{
    console.log(`Listening on port: ${port}`)
})


app.use('/api/createuser', createuser)
app.use('/api/loginuser', loginuser)
app.use('/api/submitanswers', submitanswers)
app.use('/api/getdata', getdata)
app.use('/api/getregdata', getregdata)



