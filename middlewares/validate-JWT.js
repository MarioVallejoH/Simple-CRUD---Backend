const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const validateJWT = (req, res = response,next) =>{
    // x-token can change to make token hard to read
    const token = req.header('x-token');
    // console.log(token);

    if(!token){
        return res.status(401).json({
            msg : 'No token in request.'
        })
    }

    try {
        // verify if token is valid
        const {uid} = jwt.verify(token,process.env.SECRETORPRIVATEKEY);
        
        req.uid = uid;
        req.body['uid'] = uid;
        // console.log(req.uid)
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg:'Invalid token.'
        })
    }

}

module.exports = {
    validateJWT
}

