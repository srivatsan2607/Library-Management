const express = require("express");
const router = express.Router();

const upload = require("../storageDetails.js")
const Book = require("../models/BookModel.js");

//Create route
router.post("/", upload.single("file"), function (req, res) {
	Book.create({
		title: req.body.title,
		image: req.body.image,
		body: req.body.body,
		genre: req.body.genre,
		author: req.body.author,
		publisher: req.body.publisher,
		fileId: req.file.id,
	}, function (err, newBook) {
		if (err) {
			res.render("/");
		} else {
			res.redirect("/books");
		}
	})
})

module.exports = router;