const jwt=require('jsonwebtoken')

const login=async (req,res)=>{
    try{
    const user={id:123};
    const token=jwt.sign({user},'sagarsinghsolanki', { expiresIn: "40min" })

    res.setHeader("x-auth-token", token);
    res.status(201).send({ status: true, message: " user login successful",  token: token  })
}
catch (err) {
    return res.status(500).send({status: false,error: err.message});
}
}
module.exports.login=login
