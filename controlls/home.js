var NavModel = require("./../models/nav");
var BannerModel = require("./../models/banner");
var IntroModel = require("./../models/intro");
var Utils = require("./../utils");
var Body = require("./body");

exports.getAll = function (req, res, next) {
    var models = [
        NavModel.find({}),
        BannerModel.find({})
    ];
    Promise.all(models).then(function (docs) {
        var body = {
            navs: docs[0],
            banners: docs[1]
        };
        if (req.session.user === 'admin') {
            var file = req.originalUrl == "/" ? 'index' : 'manager';
            return res.render(file, Body(body));
        }
        res.render("index", Body(body));
    }).catch(function (e) {
        req.flash("error", e.message);
        res.redirect("index");
    });
}

exports.addBanner = function(req, res, next) {
    var query = req.query;
    var title = query.title;
    var caption = query.caption;
    var description = query.description;
    var background = query.background;
    try {
        if (!title) {
            throw new Error('title不能为空');
        }
        if (!caption) {
            throw new Error('caption不能为空');
        }
        if (!description) {
            throw new Error('description不能为空');
        }
        if (!background) {
            throw new Error('background不能为空');
        }
    } catch(e) {
        return res.send(Body({
            code: 'validate',
            msg: e.message
        }));
    }

    new BannerModel({
        title,
        caption,
        description,
        background
    }).save(function(err, doc) {
        if (err) {
            return res.send(Body({
                code: 'unknown',
                msg: e.message
            }));
        }

        res.send(Body(doc));
    });
}


exports.setIntro = function(req, res, next) {
    var query = query.query;
    var title = query.title
    var caption = query.caption;
    var description = query.description;
    var backTitle = requeryq.backTitle;
    var backgrounds = query.backgrounds;

    try {
        backgrounds = backgrounds.map(function(background) {
            return {
                background
            }
        });
    } catch(e) {
        backgrounds = [];
    }

    IntroModel.create({
        title,
        caption,
        description,
        backTitle,
        backgrounds
    }, function(err , doc) {
        if (err) {
           return res.send(Body({
                code: 'unknown'
            }));
        } 
        res.send(Body(doc));
    });
}