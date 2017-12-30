var HomeDAL = require("./../dal/home");
var Utils = require("./../utils");
var Msg = require("./../config/msg");

exports.getAll = function(req, res, next) {
    HomeDAL.getAll().then(function(collections) {
        var msg = {
            navs: collections[0],
            banner: collections[1]
        };
        res.render("index", Msg(msg));
    }).catch(function(e) {
        req.flash("error", e.message);
        res.redirect("index");
    });
}