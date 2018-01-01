var NavModel = require("./../models/nav");
var BannerModel = require("./../models/banner");
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
            banner: docs[1]
        };
        res.render("index", Body(body));
    }).catch(function (e) {
        req.flash("error", e.message);
        res.redirect("index");
    });
}