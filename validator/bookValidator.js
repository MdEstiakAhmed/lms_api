const {body} = require('express-validator');

module.exports = {
    bookValidator: [
        body('bookName')
        .not().isEmpty().withMessage('book name required')
        .trim(),
        
        body('author')
        .not().isEmpty().withMessage('author required')
        .trim(),

        body('genre')
        .not().isEmpty().withMessage('genre required')
        .trim(),
    ]
}