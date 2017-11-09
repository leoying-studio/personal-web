var mongoose=require('../db').mongoose;
let Utils = require("./../utils/index");
// 定义映射的集合结构模型
var Scheam = new mongoose.Schema({
	name: {type: 'string'},
	time: {type: 'string'},
	content:{type: 'string'},
	categoryId:{type: 'string'},
	postId: {type: 'string'},
	serverTime: { type: String, default: Utils.getTime(new Date(), "s")}
});
var Commit = mongoose.model('commit', Scheam);
module.exports = Commit;