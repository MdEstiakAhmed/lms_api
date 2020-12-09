const jwt = require('jsonwebtoken');
const { findLibrarian } = require('../models/Librarian');

module.exports = async (req, res, next) => {
    const { authorization } = req.headers;
    if(authorization){
        const token = authorization.replace("Bearer ", "");
        try {
            let jwtCheck = await jwt.verify(token, process.env.LIBRARIAN_AUTH_TOKEN);
            if(jwtCheck){
                try {
                    let result = await findLibrarian({email: jwtCheck.email});
                    if(result){
                        req.student = result;
                        next();
                    }
                    else{
                        return res.status(401).json({'status': false, 'message': 'user not found'});
                    }
                } 
                catch (error) {
                    return res.status(401).json({'status': false, 'message': 'must be logged in'})
                }
            }
        } 
        catch (error) {
            console.log(error.message);
            return res.status(401).json({'status': false, 'message': 'Unauthorized'})
        }
    }
    else{
        return res.status(401).json({'status': false, 'message': 'authentication failed'})
    }
}
