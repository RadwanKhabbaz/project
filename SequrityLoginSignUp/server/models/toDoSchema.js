var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var toDoSchema = new Schema({
	name: {
		type: String
		, required: true
		,unique:true
	},
	cost:{
		type:Number
		,required:true
	},
	isDone: String
});

module.exports = mongoose.model('toDoSchema', toDoSchema);