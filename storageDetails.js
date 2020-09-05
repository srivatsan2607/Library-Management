var multer = require("multer"),
  GridFsStorage = require("multer-gridfs-storage"),
  mongoose = require("mongoose"),
  path = require("path"),
  crypto = require("crypto");

require("dotenv").config();

var storage = new GridFsStorage({
  url: (`${process.env.DB_KEY}`),
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
      });
    });
  }
});
const upload = multer({ storage });
module.exports = upload;