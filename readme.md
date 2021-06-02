# WebServer + RestServer

Remember to execute ```npm install``` to rebuild `node_modules` folder!

Take in consideration that DB used is MongoDB, so you should change credentials con `.env` file if it's necessary.

Controllers folder (`controllers/`) contain methods to make changes in DB.

DB folder (`db/`) contain configuration file to connect with DB.

Helpers folder (`helpers/`) contain files who are used to validate data from http request (`helpers/db-validator.js`) and to generate JWT (JSON Web Token) (`helpers/generate-JWT.js`) to autenticate users.

Middlewares folder (`middlewares/`) in summary contain methods to validate data comming from http request (like headers).

Models folder (`models/`) contain models to work easily with collections in DB.

Routes folder (`routes/`) contain all endPoints of server, it validates and use `controllers/` to work with data in DB and write or return data.