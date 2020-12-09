const { Schema, model} = require('mongoose');
const {findAll, find, insert, deleteItem, updateData} = require('./database');

const bookSchema = new Schema({
    bookName: {
        type: String,
        required: true,
        unique: true,
    },
    author: {
        type: String,
        required: true,
        match: /[a-z]/
    },
    genre: {
        type: String,
        required: true,
        match: /[a-z]/
    },
    releaseDate: {
        type: String,
        required: true,
    },
    bookImage: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        default: true,
    }
}, {
	timestamps: true
});

const Book = model('Book', bookSchema);

module.exports = {
    findAllBook: async () => {
        try {
            let result = await findAll(Book);
			return result;
        } 
        catch (error) {
            return false;
        }
    },
    findBook: async (data) => {
        try {
            let result = await find(Book, data);
			return result;
        } 
        catch (error) {
            return false;
        }
    },
    addBook: async(data) => {
		let dataModel = new Book(data);

		try {
            let result = await insert(dataModel);
			return result;
		} 
		catch (error) {
			return false;
		}
    },
    deleteBook: async(data) => {
        try {
            let result = await deleteItem(Book, data);
            return result;
        } 
        catch (error) {
            return false;
        }
    },
    updateBook: async (data) => {
        try {
            let result = await updateData(Book, data);
            return result;
        } 
        catch (error) {
            return error;
        }
    }
}