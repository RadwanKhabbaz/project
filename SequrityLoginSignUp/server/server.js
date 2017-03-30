var express = require("express");

var mongoose = require("mongoose");

var bodyParser = require("body-parser");

var expressJwt = require("express-jwt");
//
var config = require("./config.js");

var ejs = require("ejs");

var path = require("path");

//get port
var port = process.env.Port||8080 ; 

//setup connection
mongoose.connect("mongodb://localhost/api"+config.database);

//setup base app
var app = express();

//setup to handle json
app.use(bodyParser.urlencoded({extend: false}));
app.use(bodyParser.json());

//setup to handle config


//setup to handle files
app.use(express.static(path.join(__dirname + "\\..\\public\\")));
app.set("views", __dirname + "\\..\\public\\views");

//setup engine
app.engine("html", ejs.renderFile);
app.set("view engine", "ejs");

//setup routes
var apiRouter = require("./routes/api.js");
var authRouter = require("./routes/auth.js");
var fileRouter = require("./routes/files.js");

//check json token
//app.use("/api", expressJwt({secret: config.secret}));

app.use("/api", apiRouter);
app.use("/auth", authRouter);
app.use(fileRouter);
		
app.listen(port, function(){
	console.log("I am listening on port " + port);
});