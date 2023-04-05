const multer = require('multer');

const storageFileEngine = multer.memoryStorage();
const asset_upload = multer({ storage: storageFileEngine });

module.exports = { asset_upload };
