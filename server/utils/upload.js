const multer = require('multer')
const Storage = require('./storage')

const upload = multer({
    storage: Storage,
    fileFilter: function(req, file, callback) {
        if(file.mimetype == "image/png" || file.mimetype == "image/jpeg") {
            callback(null, true)
        } else {
            callback(null, false)
        }
    },

})

module.exports = upload