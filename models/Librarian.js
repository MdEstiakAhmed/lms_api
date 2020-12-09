const { Schema, model} = require('mongoose');
const {find, insert } = require('./database');

const librarianSchema = new Schema({
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
        default: 'librarian',
    }
}, {
	timestamps: true
});

const Librarian = model('Librarian', librarianSchema);

module.exports = {
    findLibrarian: async (data) => {
        try {
            let result = await find(Librarian, data);
			return result;
        } 
        catch (error) {
            return false;
        }
    },
    registerLibrarian: async(data) => {
		let {name, email, password} = data;
		let dataModel = new Librarian({ name, email, password });

		try {
            let result = await insert(dataModel);
			return result;
		} 
		catch (error) {
			return false;
		}
	},
}