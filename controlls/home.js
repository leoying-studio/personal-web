var HomeDAL = require("./../dal/home");
var Utils = require("./../utils");
var Body = require("./../config/body");

exports.getAll = function(req, res, next) {
    HomeDAL.getAll().then(function(collections) {
        var msg = {
            navs: collections[0],
            banner: collections[1]
        };
        res.render("index", new Body(msg));
    }).catch(function(e) {
        req.flash("error", e.message);
        res.redirect("index");
    });
}