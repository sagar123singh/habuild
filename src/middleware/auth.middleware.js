
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');



const authenticate = function (req, res, next) {
    try {

  
        let token = req.headers["x-auth-token"]
        if(!token) {return res.status(400).send({Status:false, msg:"Token must be present"})}
    
        let decodedToken = jwt.verify(token, 'sagarsinghsolanki')
        if(!decodedToken) {return res.status(400).send({status:false, msg:"Invalid token id"})}
        
     next()
    }
    catch (err) {
        res.status(500).send({ status: false, error: err.message })
    }
}

module.exports.authenticate = authenticate