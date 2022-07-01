import mongoose from 'mongoose'
const Schema = mongoose.Schema;
// 定义映射的集合结构模型
const BoardScheam = new mongoose.Schema({
	 nickname:{type: String},
	 email: {type: String},
     title:{type: String},
	 content:{type: String},
	 createdAt: {type: Date, default: Date.now},
	 updateAt: {type: Date,  default: Date.now},
});

const Board = mongoose.model('board', BoardScheam);
export default Board;