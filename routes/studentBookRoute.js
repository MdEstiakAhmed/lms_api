const router = require('express').Router();
const {getAllBookController, getSingleBookController} = require('../controllers/bookController');
const studentLoginCheck = require('../middleware/studentLoginCheck');

router.get('/getAll', studentLoginCheck, getAllBookController);
router.post('/:id', studentLoginCheck, getSingleBookController);

module.exports = router;