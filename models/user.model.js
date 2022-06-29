const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// 定义映射的集合结构模型
const UserScheam = new mongoose.Schema({
	 nickname:{type: String},
	 username: {type: String},
	 password:{type: String},
	 email: {type: String},
	 createdAt: {type: Date, default: Date.now},
	 updateAt: {type: Date,  default: Date.now},
});
/**
 * 
 * @param {*} id 查询id
 * @returns 
 */
 UserScheam.statics.$count3 = function() {
    return this.find({}).count().exec()
} 

const User = mongoose.model('users', UserScheam);
export default User;