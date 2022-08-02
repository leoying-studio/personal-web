import mongoose from 'mongoose';
import HelperPlugin from './plugins/helper'
const Schema = mongoose.Schema;

// 定义映射的集合结构模型
const MediaSchema = new Schema({
	 // 名称
     name: String,
     // 后缀
     mimeType: String,
	 originalName: String,
     // 大小kb
     size: Number,
	 createdAt: {type: Date, default: Date.now},
	 updateAt: {type: Date,  default:  Date.now},
});

MediaSchema.virtual("src").get(function() {
	debugger
	return '/uploads/' + this._id + '/' + this.fileName;
});

MediaSchema.plugin(HelperPlugin.install)

export const MediaModel = mongoose.model('media', MediaSchema);

export class MediaAccess {

	static removeById(id) {
		return this.findByIdAndRemove(id)
	}
}


