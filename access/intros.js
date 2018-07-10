
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
				headline: fields.headline
			}
		}
	};
	if (themeId) {
		model = {
			$set: {
				'themes.$.topicMap': fields.topicMap,
				'themes.$.headline': fields.headline
			}
		}
		return Intros.update({_id: id, 'themes._id': themeId}, model);
	}
	return Intros.findByIdAndUpdate(id, model);
}


exports.all = function () {
	return Intros.queryPaging({ pagination: 1, pageSize: 9999 });
}

exports.getApply = function() {
	return Intros.findOne({ apply: true });
}

exports.saveThemeItem = function(themeId, mapId, fields) {
	var innerModel = {
		$push: {
			'themes.$.map': {
				discriptiveGraph: fields.discriptiveGraph,
				presentation: fields.presentation
			}
		}
	};
	if (mapId) {
		innerHeight = {
			$set: {
				'themes.0.map.0.discriptiveGraph': fields.discriptiveGraph,
				'themes.0.map.0.presentation': fields.presentation,
				}
		};

		Intros.update({apply: true, 'themes._id': themeId}, innerModel ).then(function(doc) {
			var map = doc.map;
			var mapIndex = 0;
			for (var i = 0; i < map.length; i++ ) {
				if(map._id === mapId) {
					mapIndex = i;
					break;
				}
			}
		});
	}

	return Intros.update({apply: true, 'themes._id': themeId}, innerModel );
}

exports.destoryThemeItemById = function(themeId) {

}

exports.destoryThemeById = function (themeId) {
	return Intros.update({apply: true}, {$pull: {themes: {_id: themeId}}});
}


exports.themeItem = function(themeId) {
	return Intros.find({apply: true, "themes._id": themeId});
}


exports.destoryThemeItemById = function(themeId, mapId) {
	return IntrosModel.findOne({_id, "themes._id": themeId, "themes.map._id": mapId})
	.remove();
}


exports.getIntroById = function(id) {
	return Intros.findById(id);
}