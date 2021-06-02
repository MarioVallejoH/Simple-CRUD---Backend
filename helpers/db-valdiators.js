const Role = require('../models/rols');
const User = require('../models/user');
const Document = require('../models/documents');
const Event = require('../models/events');
const Record = require('../models/record');

// This are some autentications before doing somenthing in DB

// to autenticate if rol is register in db
const rolValidation = async (rol='')=>{
    const exist = await Role.findOne({rol});
    if(!exist){
        throw new Error(`Rol ${rol} is not defined in DB.`);
    }
}
// to autenticate if documentType is register in db
const documentTypeValidation = async (document='')=>{
    const exist = await Document.findOne({document});
    if(!exist){
        throw new Error(`Document ${document} is not defined in DB.`);
    }
}
// to autenticate if event is register in db
const eventValidation = async (event='')=>{
    const exist = await Event.findOne({event});
    if(!exist){
        throw new Error(`Event ${event} is not defined in DB.`);
    }
}
// to autenticate if someone is already register in event is register in db
const eventAsistValidation = async ( data)=>{
    const dt = new Date();
    const date = dt.getFullYear() + "/" + (dt.getMonth() + 1) + "/" + dt.getDate();
    // console.log(data);
    // console.log(data)
    const {eventType,document} = data;
    const exist = await Record.findOne({eventType, document});
    // console.log(exist)
    if(exist){

        throw new Error(`User with document ${document} is already registered in event ${eventType} ${date}.`);

        
    }
}

// to autenticate if someone is recorded
const recordValidation = async (id='')=>{
    console.log(id)
    const exist = await Record.findById(id);
    if(!exist){
        throw new Error(`Record ${id} is not defined in DB.`);
    }
}

// const recordExistValidation = async (id='')=>{
//     const exist = await Event.findById(id);
//     if(exist){
//         throw new Error(`Record ${id} is already defined in DB.`);
//     }
// }

// to autenticate if user exist in BD
const userValidation = async (uid)=>{
    // console.log(data)
    const exist = await User.findById(uid);
    // console.log(exist);
    if(!exist || exist['status']===false){
        
        // if(exist.stat)
        throw new Error(`User ${user} is not defined in DB.`);
    }
}
// to autenticate if email already exist in DB
const emailValidation= async (email = '') => {
    const exist = await User.findOne({email});
    if(exist){
        // return res.status(400).json({
        //     msg: 'The email is already in use.'
        // });
        throw new Error(`Email ${email} is already in use.`)
    }
}

module.exports = {
    rolValidation, 
    emailValidation,
    eventValidation,
    documentTypeValidation,
    userValidation,
    recordValidation,
    // recordExistValidation,
    eventAsistValidation
}
