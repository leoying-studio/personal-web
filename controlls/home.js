var HomeDAL = require("./../dal/home");
var express = require('express');
var Utils = require("./../utils");
var Body = require("./../config/body");
exports.getAll = function(req, res, next) {
    HomeDAL.getAll().then(function(data) {
        var msg = {
            navs: data[0],
            banner: data[1]
        };
        res.render("index", new Body(msg));
    }).catch(function(e) {
        req.flash("error", e.message);
        res.redirect("index");
    })
}