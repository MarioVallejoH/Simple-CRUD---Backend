const {Schema, model} = require('mongoose');
// const { recordsPUT } = require('../controllers/attendance_record');

const RecordSchema = Schema({
    id_user:{
        type: String,
        required: [true, 'Must provide an user creator id']
    },
    firstname:{
        type: String,
        required: [true, 'Name is necesary']
    },
    secondname:{
        type: String,
        // required: [true, 'Second'],
        // unique:true
    },
    firstlastname:{
        type: String,
        required: [true, 'First lastname is necessary']
    },
    secondlastname:{
        type: String,
        // required: [true, 'Password is necesary']
    },
    documentType:{
        type: String,
        required: true,
        // enum: ['C.C','T.I', 'C.E']
    },
    document:{
        type: String,
        required: [true, 'Document number is necessary'],
        // unique:true
    },
    eventType:{
        type: String,
        required: [true, 'Event is necessary']
    },
    date:{
        type: String,
        required: [true, 'Date is necessary']
    },
    status:{
        type:Boolean,
        default: true
    },
    
});

RecordSchema.methods.toJSON = function(){
    const {__v, ...record } = this.toObject();
    return record;
}

module.exports = model('Record', RecordSchema);

