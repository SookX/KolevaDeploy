const multer = require('multer')

const Storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})

module.exports = Storage;