
const Intro = require('../models/intro');

exports.save = function (fields) {
	return new Promise(function(resolve, reject) {
		Intro.findOne({}, function(err, doc) {
			if (err) {
				return reject(err);
			}
			if (doc) {
				delete fields.themes;
			}
			doc.set({...fields});
			doc.save(resolve);	
		});
	});
}

exports.destory = function (id) {
	return Intro.findByIdAndRemove(id);
}

exports.saveTheme = function (id, fields) {
	let model = {
		$push: {
			themes: {
				illustrating: fields.illustrating,
				headline: fields.headline
			}
		}
	};
	if (id) {
		model = {
			$set: {
				'themes.$.illustrating': fields.illustrating,
				'themes.$.headline': fields.headline
			}
		}
		return Intro.update({'themes._id': id}, model);
	}
	return Intro.update({}, model);
}


exports.findOne = function() {
	return Intro.findOne({}).exec();
}

exports.count = function() {
	return Intro.count().exec();
}


exports.saveThemeItem = function(themeId, mapId, fields) {
	return new Promise(function(resolve, reject) {
		let innerModel = {
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
					let doc = collection[0];
					let setModel = doc.update({'map._id': mapId}, innerModel);
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
	
		let pushModel = Intro.update({apply: true, 'themes._id': themeId}, innerModel );
		resolve(pushModel);
	});
}


exports.destoryThemeById = function (themeId) {
	return Intro.update({}, {$pull: {themes: {_id: themeId}}});
}


exports.destoryThemeItemById = function(themeId, mapId) {
	return IntroModel.findOne({_id, "themes._id": themeId, "themes.map._id": mapId})
	.remove();
}

exports.getIntroById = function(id) {
	return Intro.findById(id);
}