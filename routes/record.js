
const { Router } = require('express');
const { check , body} = require('express-validator');
const {recordsGET, recordsDELETE, recordsPATCH, recordsPOST, recordsPUT} = require('../controllers/attendance_record');
const { documentTypeValidation, eventValidation ,recordValidation, userValidation, eventAsistValidation} = require('../helpers/db-valdiators');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-JWT');


const router = Router();
router.get('/',[
    validateJWT,
    // body().custom(userValidation),
    validateFields
], recordsGET);

router.put('/:id', recordsPUT);
// id,firstname, secondname, firstlastname, 
// secondlastname, documentType, document, 
// evevent
router.post('/',[
    validateJWT,
    check('uid','Non a valid ID').isMongoId(),
    check('uid').custom(userValidation),
    check('document','Document must be a number').isNumeric(),
    body().custom(eventAsistValidation),
    check('documentType').custom(documentTypeValidation),
    check('firstname','Firstname is empty').not().isEmpty(),
    check('firstlastname', 'First lastname is empty').not().isEmpty(),
    // check('documentType').custom(documentValidation),
    check('document', 'Document is empty').not().isEmpty(),
    // check('rol', 'Not a valid role').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('eventType').custom(eventValidation),
    validateFields
], recordsPOST);

router.delete('/:id', 
    [
        validateJWT,
        check('uid','Non a valid ID').isMongoId(),
        check('uid').custom(userValidation),
        check('id','Non a valid ID').isMongoId(),
        check('id').custom(recordValidation),
        validateFields
    ],
    recordsDELETE);

router.patch('/', recordsPATCH);

module.exports = router;

