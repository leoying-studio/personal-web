
const Intro = require('../models/intro');

exports.add = function(fields) {
	return Intro.create(fields);
}

exports.destory = function (id) {
	return Intro.findByIdAndRemove(id);
}

exports.update = function(fields) {
	return Intro.updateOne({}, fields);
}

exports.find = function() {
	return Intro.findOne({}).exec();
}

exports.count = function() {
	return Intro.count().exec();
}

exports.addTheme = function(fields) {
	return Intro.update({
		$push: {
			"themes": fields
		}
	});
}

exports.updateTheme = function(id, fields) {
	let {illustrating, headline} = fields;
	return Intro.update({
		$set: {
			'themes.$.illustrating': illustrating,
			'themes.$.headline': headline
		}
	}, fields);
}

exports.destoryTheme = function() {
	return Intro.update({}, {$pull: {themes: {_id: themeId}}});
}