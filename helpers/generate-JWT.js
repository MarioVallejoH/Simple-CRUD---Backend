
const jwt = require('jsonwebtoken');

// to generate a JSON web token
const generateJWT = ( uid = '')=>{   

    return new Promise ((resolve, reject)=>{
        
        const payload = {uid};
        jwt.sign(payload,
            // key to generate JWT
            process.env.SECRETORPRIVATEKEY,
            {
                expiresIn:'4h'
            },(err,token)=>{

                if(err){
                    console.log(err);
                    reject('Cannot generate JWT.')
                }else{
                    resolve(token);
                }

            }
            );

    });


}

module.exports = {
    generateJWT
}