const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/upload')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname+ '_' + Date.now() + '_' + file.originalname)
    }
});

const upload = multer({
    storage,
    limits: {
        fileSize: 1024 * 1024 * 3
    },
    fileFilter: (req, file, cb) => {
        const type = /jpeg|jpg|png/
        const extName = type.test(path.extname(file.originalname).toLowerCase())
        const mimeType = type.test(file.mimetype)

        if(extName && mimeType){
            cb(null, true);
        }
        else{
            cb(null, false);
        }
    }
});

module.exports = upload;