const { validationResult } = require('express-validator');


const validateFields = (req, res, next)=>{
    // console.log(req.body);
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(
            errors
        );
    }

    next();
}

module.exports = {
    validateFields
}


