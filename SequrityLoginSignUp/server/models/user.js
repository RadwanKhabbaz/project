var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var toDoSchema = new Schema({
	username: {
		type: String
		,required: true
		,unique:true
	},
	password:String
});

module.exports = mongoose.model('toDoSche', toDoSchema);