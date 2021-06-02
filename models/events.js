
const  {Schema, model} = require('mongoose');


const EventSchema = Schema({
    event: {
        type: String,
        required:[true,'Event is necesary!.']
    }
});



module.exports = model('Event',EventSchema)