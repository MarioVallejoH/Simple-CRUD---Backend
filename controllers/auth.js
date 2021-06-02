
const {response}= require('express');
const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const { generateJWT } = require('../helpers/generate-JWT');

const login = async (req, res= response)=>{

    // console.log(req.body)
    const {email, password} = req.body;
    
    // verify if email exists
    
    
    try {
        const user = await User.findOne({email});

        if (!user){
            return res.status(400).json(
                {
                    msg: 'Email not registered.'
                }
            )
        }


        // verify if user is active
        // const user = await User.findOne(email);

        if (!user.status){
            return res.status(204).json(
                {
                    msg: 'Email not valid.'
                }
            )
        }

        // verify password

        const validPass = bcryptjs.compareSync(password, user.password);

        if(!validPass){
            return res.status(204).json(
                {
                    msg: 'Incorrect password.'
                }
            )
        }

    // generate JWT

    const token = await generateJWT(user.id);

        res.json({
            user,
            token
        });
    } catch (error) {
        res.status(500).json(
            {msg:"There's something wrong"}
        )
    }

    
}

module.exports = {
    login
}