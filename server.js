const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const Budget = require('./models/Budget');

let mongoURL = 'mongodb://localhost:27017/nbad-db'


mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log("Connected successfully to mongodb")    

})
.catch(err => {
    console.log(err);
}) 

app.use(express.json());


app.use('/', express.static('public'));


app.get('/hello', (req,res) => {
    res.send('Hello World!');
});

app.get('/budget', (req,res)=>{

    Budget.find({})
    .then((data) => {
        res.json(data);
    })
    .catch(err => {
        res.status(401).json({
            status: "Failure",
            err: err
        })
    })
})

app.post('/budget', async (req,res) => {

    const {title, budget, color} = req.body;

    try {

        const existBudget = await Budget.findOne({title});

        if(existBudget) {
            return res.status(400).json({message: "Object already exists!"});
        }

        const newBudget = new Budget({title, budget, color});
        await newBudget.save();

        res.status(201).json({status: "Success", data: newBudget});
    } catch(err) {
        console.log(err)
        res.status(401).json({message: 'Failure'});
    }
})

app.listen(port, ()=> {
    console.log(`App running on port: ${port}`);
});