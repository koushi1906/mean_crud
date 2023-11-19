const mongoose = require('mongoose');
const cors = require('cors');
const express = require('express');

const app = express();
const routes = require('./routes/routes');


mongoose.connect("mongodb://localhost:27017/test")
.then(()=>{
    console.log('connected to db!!');
})
.catch(error => {
    console.error(error);
});

app.use(cors());
app.use(express.json());
app.use(routes);


app.listen(8080, ()=>{
    console.log(`server is listening`);
});



