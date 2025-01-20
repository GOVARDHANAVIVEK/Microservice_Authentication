const express = require('express')
const authRouter = express()
const Datastore = require('nedb');
const fs = require('fs')
const verifyDetails = require('../middleware/authvalidation')
// Create a new database
const db = new Datastore({ filename: 'Users.db', autoload: true });
const jwt = require('jsonwebtoken')

authRouter.post('/login',async(req,res)=>{
    const {email,password} = req.body;
    
    db.findOne({Email:email}, (err, user) => {
        if (err) return res.status(500).send({err:"No Email found"});
        if(user){
            let userPassword = user.Password;
            if (userPassword == password){
                const token = jwt.sign({ id: db.id, Email:email }, "secret", {
                    expiresIn: "10m",
                  });
            
                console.log('token:\n'+token)
                return res.status(200).send("User login successful")
            }else{
                return res.status(200).send("Invalid password")
            }
            
        }else{
            return res.status(404).send("User not found")
        }
    })
    

});
authRouter.post('/signup',verifyDetails,async(req,res)=>{
    const {email,password,username} = req.body;

    //NeDB code for development...

    db.findOne({Email:email},(err,user)=>{
        console.log(user)
        if(err) return res.status(500).send(err)
            if(user){
               return res.status(400).send('email already exist')
            }else{
                db.insert({Email:email,Password:password,Username:username}, (err, newDoc) => {
                    if (err) return res.status(500).send(err)
                    console.log('Inserted:', newDoc);
                    const token = jwt.sign({ id: db.id, username: username, Email:email }, "secret", {
                        expiresIn: "10m",
                      });
                
                    console.log('token:\n'+token)
                    return res.send("User created.");
                    
                })
            }
        
    })
    
    
    
    //Mongoose or MongoDb code for production....
    

});
authRouter.get('/login',(req,res)=>{
    res.status(200).send({message:"login route"})
});

authRouter.get('/signup',(req,res)=>{
    res.status(200).send({message:"signin route"})
});



module.exports = authRouter;