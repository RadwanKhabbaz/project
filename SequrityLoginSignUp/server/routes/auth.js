var express = require("express");
var jwt = require("jsonwebtoken")
var authRouter = express.Router();
//import model
var User = require("../models/user.js");
//import config
var config = require("../config.js");
authRouter.get("/", function(req, res){
	User.find({}, function(err, data) {
		if(err){
				res.status(500).send(err);
			}else {
				res.status(200).send(data);
		    	}
	})
});
authRouter.post("/signup", function(req, res){
	User.find({username: req.body.username}, function(err, data){
	if(err){
		res.status(500).send(err);
	}else if (data.length > 0){
		res.status(400).send({"message":"username is taken"});
	}else {
		var newUser = new User(req.body);
		newUser.save(function(err, data){
			if(err){
				res.status(500).send(err);
			}else {
				res.status(200).send({"message":"You Just Signup"});
		    	}
	    	});
    	}	
	})
});

authRouter.post("/signin", function(req, res){
	User.findOne({username: req.body.username}, function(err, user){
		if(err){
			res.status(500).send(err);
		}else if (user == undefined) {
			res.status(404).send({"message": "username not exists"})
		}else if (user.password != req.body.password){
			res.status(404).send({"message":"password is wrong"})
		}else {
			//generate token
			//makes xxxxx.yyyyy.zzzzz
			var token = jwt.sign(user.toObject(), config.secret, {expiresIn: "20m"});
			
			res.status(200).send({"message":"Here is the key", token: token})
			}
		});
	});

module.exports = authRouter;