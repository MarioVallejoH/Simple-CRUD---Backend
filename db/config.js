const mongoose = require('mongoose');
// console.log(process.env.MONGODB_CNN)
const dbConnection = async () => {

    try {
        
        await mongoose.connect(process.env.MONGODB_CNN,{
            useNewUrlParser:true,
            useUnifiedTopology: true,
            useCreateIndex:true,
            useFindAndModify: true,
            autoIndex:false
        });

        console.log('Conected with db!');



    } catch (error) {
        console.log(error);
        throw new Error("Error couldn't conect with db")
    }

}

module.exports = {
    dbConnection
}
