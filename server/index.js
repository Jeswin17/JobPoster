const express = require('express');
const cors = require('cors');
const monk = require('monk');


const app = express();
const db = monk('localhost/meower');

const mews = db.get('mews');//collection of data 


app.use(cors());
app.use(express.json());

app.get('/',(req,res) =>{
    res.json({
        message:"Hey home page seeker"
    });

});//routes to / , request ,response func to get response

app.get('/mews',(req,res)=>{
    //when server gets req on /mews then query the db
    mews
        .find()//find all from db(collection),grab all of them and ...
        .then(mews =>{
            res.json(mews);//...respond as an array
        });
});


function isValidMew(mew)
    {
        return mew.name && mew.name.toString().trim() !=='' && 
         mew.content && mew.content.toString().trim() !=='' ;
    }


app.post('/mews',(req,res)=>{
    if(isValidMew(req.body)){
        const mew = {
            name : req.body.name.toString(),  
            content : req.body.content.toString(),
            created : new Date()
        };


        mews
            .insert(mew )
            .then(createdMew =>{
                res.json(createdMew);
            });
    }else{
        res.status(422);
        res.json({
            message: 'details are required traveller'
        });
    }
});

app.listen(5000,()=>{
    console.log('listening on http://localhost:5000');
})