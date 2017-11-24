var detailSchema = new mongoose.Schema({
	 title: String,
	 navId: String,
	 categoriesId: [
		 {id: {type: 'string'}}
	 ],
	 articleId: String,
	 content: string,
	 serverTime: { type: String, default: Utils.getTime(new Date(), "s")}
});
var AticleDetail = mongoose.model('acticle_detail', detailSchema);
module.exports = AticleDetail;