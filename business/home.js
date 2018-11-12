const Intro = require('../access/intro');
const Themes = require('../access/themes');
// 数据访问层
const Categories = require('./../access/categories');
const Articles = require('./../access/articles');

exports.getAll = function(req, res, next) {
    Promise.all([
		Categories.all(),
		Articles.recommends(),
		Intro.findOne(),
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

/**
 * 保存介绍信息
 */
exports.setIntro = function(req, res, next) {
	Intro.count().then(function(count) {
		if (!count) {
			Intro.add({...req.body, themes: []}).then(function(doc) {
				if (err) {
					return next(err);
				}
				req.body.data = doc;
				next();
			}).catch(next);
		} else {
			Intro.update({...req.body}).then(function(doc) {
				req.body.data = doc;
				next();
			}).catch(next)
		}
	});
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
	let {id} = req.body;
	if (id) {
		Intro.updateTheme(id, {illustrating, headline})
		.then(function(doc) {
			req.body.data = doc;
			next();
		}).catch(next);
	} else {
		Intro.addTheme({illustrating, headline})
		.then(function(doc) {
			req.body.data = doc;
			next();
		}).catch(next);
	}
}

exports.saveThemeItem = function(req, res, next) {
	let {_id, themeId, discriptiveGraph, presentation} = req.body;
	Themes.save(_id, {
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
	let body = req.body;
	Themes.removeById( body._id)
	.then(function(doc) {
		req.body.data = doc;
		next();
	}).catch(next);
}