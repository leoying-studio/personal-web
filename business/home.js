var Intro = require('../access/intro');
var Themes = require('../access/themes');
var Categories = require('./../access/categories');
var Articles = require('./../access/articles');

exports.getAll = function(req, res, next) {
    Promise.all([
		Categories.all(),
		Articles.recommends(),
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

exports.getIntro = function(req, res, next) {
	Intro.findOne().then(function(doc) {
		req.body.data = doc;
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

// 根据介绍信息保存
exports.saveTheme = function(req, res, next) {
	var body = req.body;
	var saveCommand = function() {
		Intro.saveTheme(body._id, {
			illustrating: body.illustrating,
			headline: body.headline
		}).then(function(doc) {
			req.body.data = doc;
			next();
		}).catch(next);
	}
	if (!body._id) {
		Intro.findOne().then(function(doc) {
			if (doc.length < 4) {
				return saveCommand();
			}
			req.body.message = "超过最大主题添加数";
			next();
		});
		return;
	}
	saveCommand();
}

exports.saveThemeItem = function(req, res, next) {
	var body = req.body;
    var discriptiveGraph = body.discriptiveGraph;
	var presentation = body.presentation;

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