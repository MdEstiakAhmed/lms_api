const { connect } = require('mongoose');

module.exports = {
    connectDatabase: async () => {
        try {
            let connection = await connect(process.env.DB_PATH, {
                useNewUrlParser: true, 
                useUnifiedTopology: true, 
                useFindAndModify: false,
                useCreateIndex: true
            });
            
            if(connection){
                console.log("database connected");
                return true;
            }
            else{
                console.log("database connection error");
                return false;
            }
        } 
        catch (error) {
            return false;
        }
    },
    insert: async (data) => {
        try {
            let result = await data.save();
            return result;
        } 
        catch (error) {
            return error;
        }
    },
    find: async(model, obj) => {
        try {
            let result = await model.findOne(obj)
            return result;
        } 
        catch (error) {
            return error;
        }
    },
    findAll: async(model) => {
        try {
            let result = await model.find()
            return result;
        } 
        catch (error) {
            return error;
        }
    },
    deleteItem: async (model, obj) => {
        try {
            let result = await model.deleteOne(obj)
            if(result){
                return result;
            }
        } 
        catch (error) {
            return error;
        }
    },
    updateData: async (model, data) => {
        try {
            let result = await model.findOneAndUpdate({_id: data.id}, {$set: data.updateValue }, {new: true});
            return result;
        } 
        catch (error) {
            return error;
        }
    }
}