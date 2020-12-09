const router = require('express').Router();
const {
    getAllBookController,
    getSingleBookController,
    insertBookController,
    updateBookController,
    deleteBookController,
    activeBookController,
    deactivateBookController
} = require('../controllers/bookController');
const librarianLoginCheck = require('../middleware/librarianLoginCheck');
// const upload = require('../middleware/uploadMiddleware');    // upload middleware
const {bookValidator} = require('../validator/bookValidator');

router.get('/getAll', librarianLoginCheck, getAllBookController);
router.get('/:id', librarianLoginCheck,  getSingleBookController);
router.post('/insert', [librarianLoginCheck, bookValidator], insertBookController);
router.put('/update/:id', librarianLoginCheck, updateBookController);
router.delete('/delete/:id', librarianLoginCheck, deleteBookController);
router.put('/active/:id', librarianLoginCheck, activeBookController);
router.put('/deactivate/:id', librarianLoginCheck, deactivateBookController);

module.exports = router;