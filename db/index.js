const config = require("../config/connection.json");
const mongoose = require('mongoose');
const dbConnection = mongoose.connection;

const connect = function() {
    mongoose.connect(`mongodb://${config.ip}:${config.port}/${config.db}`);
};

dbConnection.once('open' ,() => {
	console.log('连接数据库成功')
})

dbConnection.on('error', function(error) {
    console.error('Error in MongoDb connection: ' + error);
    mongoose.disconnect();
});

dbConnection.on('close', function() {
    console.log('数据库断开，重新连接数据库');
    connect();
});

connect();