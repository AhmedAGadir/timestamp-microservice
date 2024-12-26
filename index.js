// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
	res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
	res.json({ greeting: "hello API" });
});

app.get("/api/", function (req, res) {
	dateObj = new Date();
	return res.json({ unix: dateObj.getTime(), utc: dateObj.toUTCString() });
});

app.get("/api/:date", function (req, res) {
	// get date parameter from req
	const dateParam = req.params.date;
	// Init date object
	let dateObj;
	// if no date parameter, set to current date
	if (!dateParam) {
		dateObj = new Date();
	}
	// if date param is in unix timestamp format, then create date object from it
	// 5+ digits for unix timestamp
	else if (/\d{5,}/.test(dateParam)) {
		dateObj = new Date(parseInt(dateParam));
	}
	// if date parameter in a string, then convert it to  a date object
	else {
		dateObj = new Date(dateParam);
	}
	// if invalid, return a error response
	if (isNaN(dateObj)) {
		return res.json({ error: "Invalid Date" });
	}
	// if valid, return unix timestamp and utc string
	else {
		return res.json({ unix: dateObj.getTime(), utc: dateObj.toUTCString() });
	}
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
	console.log("Your app is listening on port " + listener.address().port);
});
