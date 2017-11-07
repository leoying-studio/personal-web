var config=require("./../config");
var mongoose=require('mongoose');
mongoose.connect(`mongodb://${config.ip}:${config.port}/${config.db}`);
module.exports = {
    "dbConnection":mongoose.connections,
    "mongoose":mongoose
};