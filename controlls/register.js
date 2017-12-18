
var express = require('express');
var Utils = require("./../utils");
var Body = require("./../config/body");
var RegisterDAL = require("./../dal/register");
exports.getAll = function(req, res, next) {
    RegisterDAL.getNavs().then(function(doc) {
		res.render("register", new Body({navs: doc}));
	});
}