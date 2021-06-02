
const express = require('express')
const cors = require('cors');
const { dbConnection } = require('../db/config');

class Server {

    constructor(){
        this.app = express();

        //conect with db
        this.conectWithDB();

        this.middleWares();
        this.routes();
        this.usersPath = '/api/users';
        this.recordsPath = '/api/records';
        
        this.port = process.env.PORT;
    }

    async conectWithDB(){
        await dbConnection();
    }

    routes(){
        
        // for some reason it causes node crash
        // this.app.use(this.usersPath, require('../routes/user'));
        this.app.use('/api/auth', require('../routes/auth'));
        this.app.use('/api/records', require('../routes/record'));

        this.app.use('/api/users', require('../routes/user'));
        
    }

    middleWares(){
    
        this.app.use(cors())

        // parse and body reading
        this.app.use(express.json());


        // public directory
        this.app.use(express.static('public'));
    }

    startListening(){
        this.app.listen(process.env.PORT,()=>{
            console.log('Server runing on port: ', this.port);
        })
    }
}

module.exports = Server

