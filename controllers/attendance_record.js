const {response} = require('express');

const bcryptjs = require('bcryptjs');
const Record = require('../models/record');



const recordsGET = async (req, res= response) => {
    const query = {status:true};

    const [total,records] = await Promise.all([
            Record.countDocuments(query),
            Record.find(query)
        ]
    );

    res.json({  
        // resp
        total,
        records
    })
};

const recordsPOST = async (req, res= response) => {
    console.log(req);
    const dt = new Date();
    const date = dt.getFullYear() + "/" + (dt.getMonth() + 1) + "/" + dt.getDate();
    const { firstname, secondname, firstlastname, 
        secondlastname, documentType, document, 
        eventType,} = req.body;
    
    const record = new Record({id_user : req.uid ,firstname, secondname, firstlastname, 
                            secondlastname, documentType, document, 
                            eventType, date
    });
   

    // encrypt passwd
    // const salt = bcryptjs.genSaltSync();
    // record.password = bcryptjs.hashSync(password, salt);

    // save into db
    await record.save();

    res.json({
        // "msg": "Hello world from a POST API - Controller",
        record
    })
};

const recordsPUT = async (req, res= response) => {

    const {id} = req.params;
    const {resto} = req.body;

    // TODO : Validate against BD
    const record = await Record.findByIdAndUpdate(id, resto);

    const {name, apikey, query, page=1} = req.query;

    res.json({
        // "msg": "Hello world from a PUT API - Controller",
        record
    })
};

const recordsDELETE = async (req, res= response) => {
    const {id} = req.params;
    const record = await Record.findByIdAndUpdate(id, {status:false});
    record['status']=false;
    res.json({
        msg: "Record deleted.",
        record
    })
};

const recordsPATCH = (req, res= response) => {
    res.json({
        "msg": "Hello world from a PATCH API - Controller"
    })
};

module.exports = {recordsGET, recordsDELETE, recordsPATCH, recordsPOST, recordsPUT}
