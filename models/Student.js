const { Schema, model} = require('mongoose');
const {find, insert} = require('./Database');

const studentSchema = new Schema({
    name: {
        type: String,
        maxLength: 50,
        required: true,
        match: /[a-z]/,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5
    },
    type: {
        type: String,
        default: 'student',
    }
}, {
	timestamps: true
});

const Student = model('Student', studentSchema);

module.exports = {
    findStudent: async (data) => {
        try {
            let result = await find(Student, data);
			return result;
        } 
        catch (error) {
            return false;
        }
    },
    registerStudent: async(data) => {
		let {name, email, password} = data;
		let dataModel = new Student({ name, email, password });

		try {
            let result = await insert(dataModel);
			return result;
		} 
		catch (error) {
			return false;
		}
	},
}