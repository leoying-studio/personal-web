var config = require("./config");
var mongoose = require("mongoose");
mongoose.connect("mongodb://"+config.address+":"+config.port+"/"+config.db);
var connection = mongoose.connection;
module.exports = {
	"dbConnection": connection,
	"mongoose": mongoose
}