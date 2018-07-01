
var Intros = require('./../models/intros');

exports.save = function (_id, model) {
	return new Promise(function(resolve, reject) {
		var create = function() {
			Intros.create(model, function (err, doc) {
				if (err) {
					return reject(err);
				}
				resolve(doc);
			});
		}
		if (!_id) {
			Intros.findOne({apply: true}, function(err, doc) {
				if (err) {
					return reject(err);
				}
				if (doc) {
					doc.update({apply: false}, function(err, doc) {
						if (err) {
							return reject(err);
						}
						create();
					});
					return;
				} 
				create();
			});
		} else {
			Intros.update({_id}, {$set: model}, function(err, doc) {
				if (err) {
				   return reject(err);
				}
				resolve(doc);
			});
		}
	});
}

exports.destory = function (id) {
	return Intros.findByIdAndRemove(id);
}

exports.saveTheme = function (id, themeId, fields) {
	var model = {
		$push: {
			themes: {
				map: [],
				topicMap: fields.topicMap,
				headline: fields.topicMap
			}
		}
	};
	if (themeId) {
		model = {
			$set: {
				topicMap: fields.topicMap,
				headline: fields.topicMap
			}
		}
	}
	return Intros.findByIdAndUpdate(id, model);
}


exports.all = function () {
	return Intros.queryPaging({ pagination: 1, pageSize: 9999 });
}

exports.getApply = function() {
	return Intros.findOne({ apply: true });
}

exports.saveThemeItem = function(id, themeId, fields) {
	var innerModel = {
		map: {
			theme: {
				discriptiveGraph: fields.discriptiveGraph,
				presentation: fields.presentation
			}
		}
	};
	var model = {$push: innerModel};
	if (themeId) {
		model = { $set: innerModel };
	}
	return Intros.findByIdAndUpdate(id, model);
}

exports.destoryThemeItemById = function(themeId) {

}

exports.destoryThemeById = function (themeId) {

}



