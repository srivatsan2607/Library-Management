var express = require("express"),
	methodOverride = require("method-override"),
	expressSanitizer = require("express-sanitizer"),
	app = express(),
	bodyparser = require("body-parser");

app.use(bodyparser.urlencoded({ extended: true }));
app.use(expressSanitizer());
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(methodOverride("_method"));


require("./connection.js")


app.get("/", function (req, res) {
	res.redirect("/books");
})

app.use("/upload", require("./routes/uploadRoute.js"));

app.use("/books", require("./routes/booksRoute.js"));

app.listen(3000, function () {
	console.log("Connected to server @port 3000");
})
