var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//Schema Setup
var BookSchema = new Schema({
	title:String,
	image:String,
	body:String,
	genre:String,
	author:String,
	publisher:String,
	fileId:Object,
	created:{type:Date,default:Date.now}
});

module.exports = mongoose.model("Book",BookSchema);