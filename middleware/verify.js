const { compareSync } = require('bcrypt');
const jwt = require('jsonwebtoken')
const verifyToken = (req,res,next)=>{
    let token = req.headers['authorization']
    console.log("toekn got===="+token)
    token = token.split(" ")[1]
    console.log("toekn got split===="+token)
    try {
        const decoded_token = jwt.verify(token,"secret");
        req.user = decoded_token;
        console.log("valid token",decoded_token)
        next()
    } catch (error) {
       res.status(400).send({Error:"invalid "}) 
    }

}

const roles=['Project_Manager','Team_Member','Admin']


module.exports =verifyToken