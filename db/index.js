var config=require("./../config");
var mongoose=require('mongoose');
var dbConnection = mongoose.connection;
var connectDB = function() {
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
    connectDB();
});

// 执行连接
connectDB();

module.exports = {
    "dbConnection":dbConnection,
    "mongoose":mongoose
};