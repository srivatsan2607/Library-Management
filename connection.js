var mongoose = require("mongoose");

require("dotenv").config();


module.exports = mongoose.connect(process.env.DB_KEY, {
  useFindAndModify: false,
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connected to DB!'))
  .catch(error => console.log(error.message));
