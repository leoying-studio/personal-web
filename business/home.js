var Intros = require('./../access/intros');
var Categories = require('./../access/categories');
var Articles = require('./../access/articles');

exports.getAll = function(req, res, next) {
    Promise.all([
		Categories.all(),
		Articles.recommends(),
		Intros.getApply(),
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

exports.saveIntro = function(req, res, next) {
	var body = req.body;
	Intros.save(body._id, {
		title: body.title,
		slogan: body.slogan,
		intro: body.intro,
		themeOverview: body.themeOverview,
		apply: true,
		themes: []
	}).then(function(doc) {
		req.body.data = doc;
		next();	
	}).catch(next);
}

exports.getAllIntros = function(req, res, next) {
	Intros.all().then(function(collections) {
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

exports.destroyIntro = function(req, res, next) {
	Intros.destory(req.body._id)
	.then(function(doc) {
		req.body.data = doc;
		next();
	}).catch(next);
}

// 根据介绍信息保存
exports.saveThemeByIntro = function(req, res, next) {
	var body = req.body;
	Intros.saveTheme(req.body._id, body.themeId, {
		topicMap: body.topicMap,
		headline: body.headline
	}).then(function(doc) {
		req.body.data = doc;
		next();
	}).catch(next);
}

exports.saveThemeItem = function(req, res, next) {
	var introId = body.introId;
    var themeId = body.themeId;
    var discriptiveGraph = body.discriptiveGraph;
	var presentation = body.presentation;
	Intros.saveThemeItem(introId, themeId, {
		discriptiveGraph,
		discriptiveGraph
	}).then(function(doc) {
		req.body.data = doc;
		next();
	}).catch(next);
}