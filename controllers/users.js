const {response} = require('express');

const bcryptjs = require('bcryptjs');
const User = require('../models/user');



const usersGET = async (req, res= response) => {
    const query = {status:true};

    const [total,users] = await Promise.all([
            User.countDocuments(query),
            User.find(query)
        ]
    );

    res.json({  
        // resp
        total,
        users
    })
};

const usersPOST = async (req, res= response) => {
    // console.log(req)

    const {name, email, password, rol} = req.body;

    const user = new User({name, email,password,rol
    });


    // encrypt passwd
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    // save into db
    await user.save();

    res.json({
        // "msg": "Hello world from a POST API - Controller",
        user
    })
};

const usersPUT = async (req, res= response) => {

    const {id} = req.params;
    const {password, google,correo, ...resto} = req.body;

    // TODO : Validate against BD

    if(password){
        // encrypt passwd
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }
    const user = await User.findByIdAndUpdate(id, resto);

    const {name, apikey, query, page=1} = req.query;

    res.json({
        // "msg": "Hello world from a PUT API - Controller",
        user
    })
};

const usersDELETE = async (req, res= response) => {
    const {id} = req.params;
    const user = await User.findByIdAndUpdate(id, {status:false});
    user['status']=false;
    res.json({
        msg: "User deleted.",
        user
    })
};

const usersPATCH = (req, res= response) => {

    res.json({
        "msg": "Hello world from a PATCH API - Controller"
    })
};

module.exports = {usersGET, usersDELETE, usersPATCH, usersPOST, usersPUT}
