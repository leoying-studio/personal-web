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

MediaSchema.plugin(HelperPlugin.install)

/**
 * 业务量比较少直接写里面就可以, 否则建议使用loadClass
 */
//删除当前文档
MediaSchema.statics.$removeById = function(id) {
	return this.findByIdAndRemove(id)
}

MediaSchema.virtual("src").get(function() {
	debugger
	return '/uploads/' + this._id + '/' + this.fileName;
});

const Media = mongoose.model('media', MediaSchema);

export default Media