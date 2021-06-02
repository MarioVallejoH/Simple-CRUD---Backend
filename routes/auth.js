
const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth');
const { validateFields } = require('../middlewares/validate-fields');



const router = Router();
router.post('/login',
    [
        // (req)=>{console.log(req.body)},
        check('email','Must provide a valid email.').isEmail(),
        check('password','Must provide a password.').notEmpty(),
        validateFields
    ],
    login);


module.exports = router;
