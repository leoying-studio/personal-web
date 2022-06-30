import mongoose from 'mongoose'
const Schema = mongoose.Schema;

// 定义映射的集合结构模型
const UserScheam = new mongoose.Schema({
	 nickname:{type: String},
	 username: {type: String},
	 password:{type: String},
	 createdAt: {type: Date, default: Date.now},
	 updateAt: {type: Date,  default: Date.now},
});

UserScheam.statics.$findOne = function(username, password) {
	return this.findOne({username, password}).exec()
}

const User = mongoose.model('users', UserScheam);
export default User;