const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

module.exports = {
  dest: path.resolve(__dirname, '..', '..', 'files', 'uploads'),
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(__dirname, '..', '..', 'files', 'uploads'));
    },
    filename: (req, file, cb) => {
      crypto.randomBytes(30, (err, hash) => {
        if (err) cb(err);
        file.key = `${hash.toString('hex')}${path.extname(file.originalname)}`;
        cb(null, file.key);
      });
    },
  }),
};
