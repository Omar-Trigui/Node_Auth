const express = require('express')
const app = express()
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const port = 3000
//Importing route
const authRoute = require('./routes/auth');
const postRoute = require('./routes/post');
//Mongo DB connection
dotenv.config();
mongoose.connect(process.env.DBSTRING,
{ useNewUrlParser: true ,useUnifiedTopology: true  },
() =>{
    console.log('connected to db');
})

//Route middelwares
app.use(express.json());
app.use('/api/user',authRoute);
app.use('/api/post',postRoute);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
app.get('/', (req, res) => res.send('Hello World!'))





