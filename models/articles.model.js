import mongoose from 'mongoose'
import HelperPlugin from './plugins/helper'
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
// 定义映射的集合结构模型
const ArticleScheam = new Schema({
	title: String,
	description: String,
	// 配图, 说明图
	illustration: {type: String, default: ""},
	createdAt: {type: Date, default: Date.now},
	updateAt: {type: Date,  default: Date.now},
	// 所属分类
	categories: [
		{
			type: ObjectId, 
			required: true, 
			ref: 'categories'
		}
	],
	// 是否作为推荐
	recommend: {type: Boolean, default: false},
	// 首页推荐图
	recommendPicture: String,
	// 文章内容
	content: {
		type: String,
		required: true
	}
}, {
	timestamps: {createdAt: 'createdAt', updatedAt: 'updateAt'}
});

ArticleScheam.plugin(HelperPlugin.install)

ArticleScheam.pre('update', function() {
	this.update({},{ $set: { updatedAt: new Date() } });
})

export const ArticlesModel = mongoose.model('articles', ArticleScheam);
/**
 *  之所以没有用内置api statics 方法挂载静态方法是因为容易导致命名冲突
 *  所以重新封装一层
 */
export class ArticleModalAccess{

	 static async aggregate(count = 3) {
		const documents = await ArticlesModel.aggregate([
			{
				$facet: {
					recommend: [
						{
							$match: {
								recommend: true
							},
						}
					],
					recently: [
						{"$skip":0 * count},
						{"$limit":count},
						{"$sort": {
							_id: -1
						}}
					]
				}
			}
		]);
		const [{recommend, recently}] = documents;
		return {
			recommend,
			recently
		}
	}

	static limit3() {
		return ArticlesModel.find({}).limit(3).exec()
	}

	static findRecommend() {
		return ArticlesModel.find({
			recommend: true
		})
	}

	static remove(id) {
		return ArticlesModel.findByIdAndRemove(id)
	}

	static pushSub(id, cateId) {
		return ArticlesModel.findByIdAndUpdate({_id: id, 'categories._id': cateId}, {$pull: {categories: {
			_id: cateId
		}}});
	}

	static pullSub(id, cateId) {
		return ArticlesModel.findByIdAndUpdate({_id: id, 'categories._id': cateId}, {$pull: {categories: {
			_id: cateId
		}}});
	}

	static findByIdAndUpdate(id, data) {
		return ArticlesModel.findByIdAndUpdate(id, {
			$set: data	
		}).exec()
	}

	static findOne(id) {
		return ArticlesModel.findOne({_id: id}).exec()
	}

	static findByIdAndPopulate(id) {
		return ArticlesModel.findById(id).populate("categories").exec()
	}
}
