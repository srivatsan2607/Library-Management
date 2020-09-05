const express = require("express");
const router = express.Router();
var Grid = require("gridfs-stream"),
	mongoose = require("mongoose");
const Book = require("../models/BookModel.js");

var ObjectId = mongoose.Types.ObjectId;

const conn = mongoose.connection;
let gfs;
conn.once('open', function () {
	gfs = Grid(conn.db, mongoose.mongo);
	gfs.collection("uploads");
	// all set!
})


// Index route
router.get("/", function (req, res) {
	Book.find({}, function (err, books) {
		if (err) {
			console.log(err.message)
		} else {
			res.render("books", { books: books });
		}
	})
})

router.post("/", function (req, res) {
	var genre = req.body.genre;
	var author = req.body.author;
	var publisher = req.body.publisher;
	if (genre === "" && author === "" && publisher === "") {
		res.redirect("/books");
	} else {

		if (author === "" && publisher === "") {
			Book.find({
				genre: genre,
			}, function (err, books) {
				if (err) {
					res.redirect("/books");
				} else {
					res.render("books", { books: books });
				}
			})
		}
		else if (genre === "" && publisher === "") {
			Book.find({
				author: author
			}, function (err, books) {
				if (err) {
					res.redirect("/books");
				} else {
					res.render("books", { books: books });
				}
			})
		} else if (genre === "" && author === "") {
			Book.find({
				publisher: publisher,
			}, function (err, books) {
				if (err) {
					res.redirect("/books");
				} else {
					res.render("books", { books: books });
				}
			})
		} else if (genre === "") {
			Book.find({
				author: author,
				publisher: publisher
			}, function (err, books) {
				if (err) {
					res.redirect("/books");
				} else {
					res.render("books", { books: books });
				}
			})
		} else if (author === "") {
			Book.find({
				genre: genre,
				publisher: publisher,
			}, function (err, books) {
				if (err) {
					res.redirect("/books");
				} else {
					res.render("books", { books: books });
				}
			})
		} else if (publisher === "") {
			Book.find({
				genre: genre,
				author: author,
			}, function (err, books) {
				if (err) {
					res.redirect("/books");
				} else {
					res.render("books", { books: books });
				}
			})
		} else {
			Book.find({
				genre: genre,
				publisher: publisher,
				author: author,
			}, function (err, books) {
				if (err) {
					res.redirect("/books");
				} else {
					res.render("books", { books: books });
				}
			})
		}
	}
})

//New route
router.get("/new", function (req, res) {
	res.render("new");
})

//Show route
router.get("/:id", function (req, res) {
	Book.findById(req.params.id, function (err, foundBook) {
		if (err) {
			res.redirect("/books/new");
		} else {
			res.render("show", { book: foundBook });
		}
	})
})

router.get("/view/:fileid", (req, res) => {
	const file = gfs
		.files.find({
			_id: req.params.fileid
		}, (err, file) => {
			if (!file || file.length === 0) {
				return res.status(404).json({
					err: "no files exist"
				});
			} else {
				var readstream = gfs.createReadStream({ _id: req.params.fileid });
				readstream.pipe(res)
			};
		})
});

//Edit route
router.get("/:id/edit", function (req, res) {
	Book.findById(req.params.id, function (err, foundBook) {
		if (err) {
			res.redirect("/books/" + req.params.id);
		} else {
			res.render("edit", { book: foundBook });
		}
	})
})

//Update route
router.put("/:id", function (req, res) {

	Book.findByIdAndUpdate(req.params.id, req.body.book, function (err, updatedBook) {
		if (err) {
			alert("Update failed");
			res.redirect("/books/" + req.params.id);
		} else {
			res.redirect("/books/" + req.params.id);
		}
	})
})

//Delete route
router.delete("/:id", function (req, res) {
	Book.findByIdAndRemove(req.params.id, function (err, foundBook) {
		if (err) {
			res.redirect("/books/" + req.params.id);
		} else {
			gfs.remove({ _id: ObjectId(req.params.fileid), root: "uploads" }, (err, gridstore) => {
				if (err) {
					return res.status(404).json({
						err: err
					});
				}
			})
			res.redirect("/books");
		}
	})
})

module.exports = router;
