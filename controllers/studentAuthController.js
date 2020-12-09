const bcrypt = require('bcryptjs');
const { findStudent, registerStudent } = require('../models/Student');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');

module.exports = {
    signupController: async (req, res, next) => {
        let { name, email, password, confirmPassword } = req.body;
		let errors = validationResult(req).formatWith(error => error.msg)

		if(!errors.isEmpty()){
            console.log("errors: ", errors);
            return res.status(412).json({'status': false, 'message': errors.mapped()});
		}

		try {
            let hashedPassword = await bcrypt.hash(password, 10);
            let data = { name, email, password: hashedPassword };
            check = await findStudent({email});
            if(!check){
                let result = await registerStudent(data);
                if(result){
                    return res.status(200).json({'status': true, 'data': result});
                }
                else{
                    return res.status(412).json({'status': false, 'message': {"error": "registration error"}});
                }
            }
            else{
                return res.status(412).json({'status': false, 'message': {'email': "already exist"}});
            }
		} 
		catch (error) {
			return res.status(412).json({'status': false, 'message': {"error": "server error"}});
		}
    },

    loginController: async (req, res, next) => {
        let { email, password } = req.body;

		try {
			let result = await findStudent({email});
			if(result){
				let match = await bcrypt.compare(password, result.password);
				if(match){
                    const token = jwt.sign({email: result.email}, process.env.STUDENT_AUTH_TOKEN, {expiresIn: '2h'});
                    return res.status(200).json({'status': true, 'token': token, 'data': result});
				}
				else{
					return res.status(412).json({'status': false, 'message': {"error": "credential does not match"}});
				}
			}
			else{
				return res.status(412).json({'status': false, 'message': {"error": "credential does not match"}});
			}
		} 
		catch (error) {
			return res.status(412).json({'status': false, 'message': {"error": "server error"}});
		}
    }
}