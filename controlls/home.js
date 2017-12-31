var HomeDAL = require("./../dal/home");
var Utils = require("./../utils");
var Body = require("./body");

exports.getAll = function(req, res, next) {
    HomeDAL.getAll().then(function(collections) {
        var body = {
            navs: collections[0],
            banner: collections[1]
        };
        // if (req.session.user === 'admin') {
        //     return res.render("manager", Body(body));
        // } 
        res.render("index", Body(body));
    }).catch(function(e) {
        req.flash("error", e.message);
        res.redirect("index");
    });
}