
var Intros = require('./../model/intros');

exports.save = function (_id, conditions, model) {
	return new Promise(function(resolve, reject) {
		var create = function() {
			IntrosModel.create(req.body.models, function (err, doc) {
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
			IntrosModel.update({_id}, {$set: req.body.models}, function(err, doc) {
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

exports.saveTheme = function (id, themeId, topicMap, headline) {
	var fields = {
		$push: {
			themes: {
				map: [],
				topicMap,
				headline
			}
		}
	};
	if (themeId) {
		fields = {
			$set: {
				topicMap,
				headline
			}
		}
	}
	return Intros.update({ id }, fields);
}


exports.all = function () {
	return Intros.queryPaging({ pagination: 1, pageSize: 9999 });
}

exports.saveByTheme = function(id, themeId, model) {
	var fields = {
		$push: {
			map: {
				theme: {
					discriptiveGraph,
					presentation
				}
			}
		}
	};
	if (themeId) {
		fields = {
			$set: {
				map: {
					theme: {
						discriptiveGraph,
						presentation
					}
				}
			}
		};
	}
	return Intros.findByIdAndUpdate(id, fields);
}

exports.getListByTheme = function(pagination = 1) {
	var start = (pagination - 1) * 4;
	var end = pagination * 4;
	return await IntrosModel.findOne({ apply: true }).populate('themes', { slice: [start, end] });
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



