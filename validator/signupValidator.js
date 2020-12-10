const {body} = require('express-validator');
const { findLibrarian } = require('../models/Librarian');
const { findStudent } = require('../models/Student');

module.exports = {
    signupValidator: [
        body('name')
        .not().isEmpty().withMessage('name required')
        .isLength({min: 3, max: 50}).withMessage('name must be between 3 to 15 character')
        .trim(),
        
        body('email')
        .not().isEmpty().withMessage('email required')
        .isEmail().withMessage('please provide a valid email')
        .normalizeEmail(),
    
        body('password')
        .not().isEmpty().withMessage('password required')
        .isLength({min: 5}).withMessage('password must be greater then or equal 5 character'),
    
        body('confirmPassword')
        .not().isEmpty().withMessage('confirm password required')
        .custom((confirmPassword, {req}) => {
            if(confirmPassword !== req.body.password){
                throw new Error('password does not match');
            }
            return true;
        })
    ]
}