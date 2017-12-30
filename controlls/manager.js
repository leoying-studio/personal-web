var HomeDAL = require("./../dal/home");
var express = require('express');
var Utils = require("./../utils");
var Body = require("./body");

exports.getAll = function(req, res, next) {
    HomeDAL.getAll().then(function(collections) {
        var msg = {
            navs: collections[0],
            banner: collections[1]
        };
        res.render("manager", Body(msg));
    }).catch(function(e) {
        req.flash("error", e.message);
        res.redirect("manager");
    });
}