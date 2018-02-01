var NavModel = require("./../models/nav");
var BannerModel = require("./../models/banner");

exports.getAll = function(callback) {
	var models = [
        NavModel.find({}),
        BannerModel.find({})
    ];
    Promise.all(models).then(function (docs) {
        var body = {
            navs: docs[0],
            banners: docs[1]
        };
		callback(body);
    })
}