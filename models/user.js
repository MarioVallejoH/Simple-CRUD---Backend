const {Schema, model} = require('mongoose');
// const { usersPUT } = require('../controllers/users');
// {
//     name: "",
//     email:"",
//     password:"encrypted",
//     img: 'img',
//     rol: "",
//     enabled: true,
//     google:false
// }
const UsersSchema = Schema({
    name:{
        type: String,
        required: [true, 'Name is necesary']
    },
    email:{
        type: String,
        required: [true, 'E-mail is necesary'],
        unique:true
    },
    password:{
        type: String,
        required: [true, 'Password is necesary']
    },
    img:{
        type: String,
    },
    rol:{
        type: String,
        required: true,
        enum: ['ADMIN_ROLE','USER_ROLE']
    },
    status:{
        type:Boolean,
        default: true
    },
    google:{
        type:Boolean,
        default:false

    }
});

UsersSchema.methods.toJSON = function(){
    const {__v, password, _id ,...user } = this.toObject();
    user['uid']= _id
    return user;
}

module.exports = model('User', UsersSchema);

