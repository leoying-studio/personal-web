
var Intros = require('./../model/intros');

exports.save = function (_id, model) {
	return new Promise(function(resolve, reject) {
		var create = function() {
			IntrosModel.create(model, function (err, doc) {
				if (err) {
					return reject(err);
				}
				resolve(doc);
			});
		}
		if (!_id) {
			IntrosModel.findOne({apply: true}, function(err, doc) {
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
			IntrosModel.update({_id}, {$set: model}, function(err, doc) {
				if (err) {
				   return reject(err);
				}
				resolve(doc);
			});
		}
	});
}

exports.destory = function (id, cb) {
	Intros.findByIdAndRemove(id, cb);
}

exports.saveTheme = function (id, themeId, topicMap, headline, cb) {
	var model = {
		$push: {
			themes: {
				map: [],
				topicMap,
				headline
			}
		}
	};
	if (themeId) {
		model = {
			$set: {
				topicMap,
				headline
			}
		}
	}
	return Intros.findByIdAndUpdate(id, model, cb);
}


exports.all = function (cb) {
	return Intros.queryPaging({ pagination: 1, pageSize: 9999 });
}

exports.getApply = function(cb) {
	Intros.findOne({ apply: true }, cb);
}

exports.saveByTheme = function(id, themeId, fields, cb) {
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
	Intros.findByIdAndUpdate(id, model, cb);
}

exports.destoryThemeItemById = function(themeId) {
	return new Promise(function (resolve, reject) {
		Intros.findOne({ apply: true }, function (err, doc) {
			if (err) {
				return reject(err);
			}
			doc.remove(function (doc) {
				resolve(doc);
			});
		});
	});
}

exports.destoryThemeById = function (themeId) {
	return new Promise(function (resolve, reject) {
		Intros.findOne({ apply: true }, function (err, doc) {
			if (err) {
				return reject(err);
			}
			doc.remove(function (doc) {
				resolve(doc);
			});
		});
	});
}



