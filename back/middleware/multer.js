const multer = require('multer');
const MIME_TYPES = {
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpeg',
    'image/png': 'png'
}
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images')
    },
    filename: (req, file, cb) => {
        const ext = MIME_TYPES[file.mimetype];
        const newName = req.body.username + Date.now() + '.' + ext;
        req.filename = newName;
        cb(null, newName);
    }
});

module.exports = multer({ storage }).single('image');