const { use } = require("../routes/auth");

const verifyDetails =(req,res,next)=>{
    const {email,password,username} = req.body;

    if(!email || !password || !username){
        return res.status(400).send({error:"All fields required"})
    }

    const emailRegex = /^[a-zA-Z0-9]*@[a-zA-Z]*.[a-zA-z]/;
    if (!emailRegex.test(email)) {
        return res.status(400).send({ error: 'Invalid email format' });
    }

    if (password.length < 6) {
        return res.status(400).send({ error: 'Password must be at least 6 characters' });
    }
    
    if(username.length <8){
        return res.status(400).send({ error: 'Username must be at least 8 characters' });
    }
    
    next();
}

module.exports = verifyDetails