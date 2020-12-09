const {findAllBook, findBook, addBook, deleteBook, updateBook} = require('../models/Book');
const {validationResult} = require('express-validator');

module.exports = {
    getAllBookController: async (req, res, next) => {
        try {
            const result = await findAllBook();
            if(result){
                return res.status(200).json({'status': true, 'data': result});
            }
            else{
                return res.status(412).json({'status': false, 'message': {'error': "no data found"}});
            }
        } catch (error) {
            return res.status(412).json({'status': false, 'message': {'error': "server error"}});
        }
    },

    getSingleBookController: async(req, res, next) => {
        try {
            const result = await findBook({_id: req.params.id});
            if(result){
                return res.status(200).json({'status': true, 'data': result});
            }
            else{
                return res.status(412).json({'status': false, 'message': {'error': "no data found"}});
            }
        } 
        catch (error) {
            return res.status(412).json({'status': false, 'message': {'error': "server error"}});
        }
    },

    insertBookController: async (req, res, next) => {
        const { bookName, author, genre, releaseDate, bookImage } = req.body;
        const data = {bookName, author, genre, releaseDate, bookImage};

        let errors = validationResult(req).formatWith(error => error.msg);
        if(!errors.isEmpty()){
            return res.status(412).json({'status': false, 'message': errors.mapped()});
        }

        try {
            const check = await findBook({bookName});
            if(!check){
                let result = await addBook(data);
                if(!result.errors){
                    return res.status(200).json({'status': true, 'data': result});
                }
                else{
                    return res.status(412).json({'status': false, 'message': {"error": "insertion error"}});
                }
            }
            else{
                return res.status(412).json({'status': false, 'message': {'error': "already exist"}});
            }
        } 
        catch (error) {
            return res.status(412).json({'status': false, 'message': {'error': "server error"}});
        }

    },

    updateBookController: async(req, res, next) => {
        try {
            if(req.body.bookName){
                const check = await findBook({bookName: req.body.bookName});
                if(check){
                    return res.status(412).json({'status': false, 'message': {'error': "already exist"}});
                }
            }
            let data ={
                id: req.params.id,
                updateValue: req.body
            }
            let result = await updateBook(data);
            if(result._id){
                return res.status(200).json({'status': true, 'message': 'update successfully' });
            }
            else{
                return res.status(412).json({'status': false, 'message': {'error': "can not update"}});
            }
        } 
        catch (error) {
            return res.status(412).json({'status': false, 'message': {'error': "server error"}});
        }
    },
    deleteBookController: async (req, res, next) => {
        try {
            const check = await findBook({_id: req.params.id});
            if(check){
                const result = await deleteBook({_id: req.params.id});
                if(result.deletedCount){
                    return res.status(200).json({'status': true, 'message': 'deleted successfully' });
                }
                else{
                    return res.status(412).json({'status': false, 'message': {'error': "can not delete"}});
                }
            }
            else{
                return res.status(412).json({'status': false, 'message': {'error': "not found"}});
            }
        } 
        catch (error) {
            return res.status(412).json({'status': false, 'message': {'error': "server error"}});
        }
        
    },
    activeBookController: async(req, res, next) => {
        let data ={
            id: req.params.id,
            updateValue: {
                status: true
            }
        }
        try {
            let result = await updateBook(data);
            if(result._id){
                return res.status(200).json({'status': true, 'message': 'active successfully' });
            }
            else{
                return res.status(412).json({'status': false, 'message': {'error': "can not active"}});
            }
        } 
        catch (error) {
            return res.status(412).json({'status': false, 'message': {'error': "server error"}});
        }
    },
    deactivateBookController: async(req, res, next) => {
        let data ={
            id: req.params.id,
            updateValue: {
                status: false
            }
        }
        try {
            let result = await updateBook(data);
            console.log(result);
            if(result._id){
                return res.status(200).json({'status': true, 'message': 'deactivate successfully' });
            }
            else{
                return res.status(412).json({'status': false, 'message': {'error': "can not deactivate"}});
            }
        } 
        catch (error) {
            return res.status(412).json({'status': false, 'message': {'error': "server error"}});
        }
    }
}