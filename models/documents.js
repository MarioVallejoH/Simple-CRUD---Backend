
const  {Schema, model} = require('mongoose');


const DocumentSchema = Schema({
    document: {
        type: String,
        required:[true,'Document is necesary!.']
    }
});



module.exports = model('Document',DocumentSchema)