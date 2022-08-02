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

export const UserModal = mongoose.model('users', UserScheam);

export class UserModalAccess {

	static findOne(username, password) {
		return UserModal.findOne({username, password}).exec()
	}

	static count() {
		return UserModal.count()
	}
}



