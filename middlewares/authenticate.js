const jwt = require('jsonwebtoken');

const createToken = ((req,res)=>{
    const payload = JSON.stringify(req.payload);
    console.log(req.payload,"Create token");
    const token = jwt.sign(payload,
        process.env.JWT_SECRET_KEY
    );
    return res.status(200).json({code:200,message:"user found",data:{token:token}})
});

const verifyToken = ()=>{
    jwt.verify(token,process.env.JWT_SECRET_KEY,(err,decoded)=>{
        if(err){
            console.log(err);
        }
        return decoded
    })
}

module.exports = {createToken, verifyToken};