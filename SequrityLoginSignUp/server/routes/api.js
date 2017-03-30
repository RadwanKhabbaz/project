var express = require("express");

var mongoose = require("mongoose");

var bodyParser = require("body-parser");

//load in collection
var ToDo = require("../models/toDoSchema.js");

//make router for routes
var apiRouter = express.Router();


apiRouter.get("/", function(req, res){
	ToDo.find({}, function(err, data){
		if(err){
			res.statis(500).send({message: "Error", err: err});
		}else {
			res.status(200).send({data: data});
		}
	});
});


apiRouter.post("/", function(req, res){
	var newToDoItem = new ToDo(req.body);
	newToDoItem.save(function(err, data){
		if(err){
			res.status(500).send({message:"error in data  entered"});
		}else{
			res.status(200).send({message:"the data is inserted"});
		}
	});
});
 
apiRouter.delete("/:id", function(req, res){
	ToDo.findOne({_id:req.params.id}, function(err,data){
		if(err){
			res.status(500).send({message:"error internal "});
		}else if(data == undefined){
			res.status(404).send({message:"No such item with this id"});
		}else {
			data.remove(function(err,data){
				if(err){
					res.status(405).send({message:"error "});
				}
				else{
					res.status(200).send({message:"success"});
				};
			});
		};
	});
});

apiRouter.put("/:id", function(req, res){
	ToDo.findOne({_id: req.params.id}, function(err, data){
		if(err){
			res.status(500).send({message:"internal error"+err})
		}else if(data == undefined){
			res.status(404).send({message:"not founnd"});
		}else{
			for(key in req.query){
				data[key]=req.query[key];
			};
			data.save();
			res.status(200).send({updatedData:data});
		};
	});
});




module.exports = apiRouter;