const router = require('express').Router();
const {signupController, loginController} = require('../controllers/studentAuthController');
const {signupValidator} = require('../validator/signupValidator');

router.post('/signup', signupValidator, signupController);
router.post('/login', loginController);

module.exports = router;