
var Intro = require('../models/intro');

exports.save = function (fields) {
	if (!fields._id) {
		return Intro.create(fields).exec();
	}
	delete fields.themes;
	return Intro.update({_id: fields._id}, fields).exec();
}

exports.destory = function (id) {
	return Intro.findByIdAndRemove(id);
}

exports.saveTheme = function (id, themeId, fields) {
	var model = {
		$push: {
			themes: {
				map: [],
				illustrating: fields.illustrating,
				headline: fields.headline
			}
		}
	};
	if (themeId) {
		model = {
			$set: {
				'themes.$.illustrating': fields.illustrating,
				'themes.$.headline': fields.headline
			}
		}
		return Intro.update({_id: id, 'themes._id': themeId}, model);
	}
	return Intro.findByIdAndUpdate(id, model);
}


exports.all = function () {
	return Intro.queryPaging({ pagination: 1, pageSize: 9999 });
}

// exports.getApply = function() {
// 	return Intro.findOne({ apply: true });
// }

exports.saveThemeItem = function(themeId, mapId, fields) {
	return new Promise(function(resolve, reject) {
		var innerModel = {
			$push: {
				'themes.$.map': {
					discriptiveGraph: fields.discriptiveGraph,
					presentation: fields.presentation
				}
			}
		};
		if (mapId) {
			innerModel = {
				$set: {
					'map.discriptiveGraph': fields.discriptiveGraph,
					'map.presentation': fields.presentation,
					}
			};
			Intro.findOne({apply: true, 'themes.map._id': mapId})
			.then(function(doc) {
				doc.find({'themes._id': themeId})
				.then(function(collection) {
					var doc = collection[0];
					var setModel = doc.update({'map._id': mapId}, innerModel);
					resolve(setModel);
				}).catch(function(err) {
					reject(err);
				});
			}).catch(function(err) {
				reject(err);
			});
			return;
			// return Intro.update({apply: true, 'themes.map._id': mapId}, innerModel );
		}
	
		var pushModel = Intro.update({apply: true, 'themes._id': themeId}, innerModel );
		resolve(pushModel);
	});
}


exports.destoryThemeById = function (themeId) {
	return Intro.update({}, {$pull: {themes: {_id: themeId}}});
}


exports.themeItem = function(themeId) {
	return Intro.find({apply: true, "themes._id": themeId});
}


exports.destoryThemeItemById = function(themeId, mapId) {
	return IntroModel.findOne({_id, "themes._id": themeId, "themes.map._id": mapId})
	.remove();
}


exports.getIntroById = function(id) {
	return Intro.findById(id);
}