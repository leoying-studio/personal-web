var Intro = require('../access/intro');
var Themes = require('../access/themes');
var Categories = require('./../access/categories');
var Articles = require('./../access/articles');

exports.getAll = function(req, res, next) {
    Promise.all([
		Categories.all(),
		Articles.recommends(),
		// Intro.getApply(),
		Articles.timeline(),
	]).then(function(collections) {
		req.body.data = {
			categories: collections[0],
			recommends: collections[1],
			intro: collections[2] || {},
			timeline: collections[3]
		};
		next();
	}).catch(next);
}

exports.setIntro = function(req, res, next) {
	Intro.save(req.body)
	.then(function(doc) {
		req.body.data = doc;
		next();
	}).catch(next);
}

exports.getAllIntro = function(req, res, next) {
	Intro.all().then(function(collections) {
		req.body.data = collections;
		next();
	}).catch(next);
}

exports.getAllCategories = function(req, res, next) {
	Categories.all()
	.then(function(collections) {
		req.body.data = {
			categories: collections
		};
		next();
	});
}

// exports.destroyIntro = function(req, res, next) {
// 	Intro.destory(req.body._id)
// 	.then(function(doc) {
// 		req.body.data = doc;
// 		next();
// 	}).catch(next);
// }

// 根据介绍信息保存
exports.saveThemeByIntro = function(req, res, next) {
	var body = req.body;
	Intro.saveTheme(req.body._id, body.themeId, {
		illustrating: body.illustrating,
		headline: body.headline
	}).then(function(doc) {
		req.body.data = doc;
		next();
	}).catch(next);
}

exports.saveThemeItem = function(req, res, next) {
	var body = req.body;
    // var themeId = body.themeId;
    var discriptiveGraph = body.discriptiveGraph;
	var presentation = body.presentation;
	var themeId = body.themeId;
	Themes.save(req.body._id, {
		themeId,
		discriptiveGraph,
		presentation
	}).then(function(doc) {
		req.body.data = doc;
		next();
	}).catch(next);
}

exports.getThemeCategories = function(req, res, next) {
	Intro.findOne().then(function(doc) {
		doc = doc || {
			themes: []
		};
		req.body.data = doc.themes;
		next();
	});
}

exports.getThemeMap = function(req, res, next) {
	Themes.getAllById(req.body.themeId)
	.then(function(collections) {
		req.body.data = collections;
		next();
	});
}

exports.destroyIntroTheme = function(req, res, next) {
	Intro.destoryThemeById(req.body.themeId)
	.then(function(doc) {
		req.body.data = doc;
		next(); 
	});
}

exports.destoryThemeItem = function(req, res, next) {
	var body = req.body;
	Themes.removeById( body._id)
	.then(function(doc) {
		req.body.data = doc;
		next();
	}).catch(next);
}