
const { Router } = require('express');
const { check } = require('express-validator');
const {usersGET, usersDELETE, usersPATCH, usersPOST, usersPUT} = require('../controllers/users');
const { rolValidation, emailValidation, userValidation} = require('../helpers/db-valdiators');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-JWT');


const router = Router();
router.get('/', usersGET);

router.put('/:id', usersPUT);

router.post('/',[
    check('email', 'Email is not an email direction.').isEmail(),
    check('email').custom(emailValidation),
    check('name', 'Name is empty').not().isEmpty(),
    check('password', 'Name is necesary and must contain min 6 characters').isLength({min:6}),
    // check('rol', 'Not a valid role').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom(rolValidation),
    validateFields
], usersPOST);

router.delete('/:id', [
        validateJWT,
        check('id','Non a valid ID').isMongoId(),
        check('id').custom(userValidation),
        validateFields
    ],
    usersDELETE);

router.patch('/',
    
     usersPATCH);

module.exports = router;

