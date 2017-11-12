var detailSchema = new mongoose.Schema({
	 title: String,
	 videoUrl: {type: 'string'},
	 videoThumbnail: {type: 'string'},
	 img: {type: 'string'},
	 text: {type: 'string'},
	 navId: String,
	 categoriesId: [
		 {id: {type: 'string'}}
	 ],
	 serverTime: { type: String, default: Utils.getTime(new Date(), "s")}
});
var AticleDetail = mongoose.model('acticle_detail', detailSchema);
module.exports = AticleDetail;