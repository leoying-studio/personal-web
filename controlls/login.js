
var express = require('express');
var Utils = require("./../utils");
var Body = require("./../config/body");
var LoginDAL = require("./../dal/login");
exports.getAll = function(req, res, next) {
    LoginDAL.getNavs().then(function(doc) {
		res.render("login", new Body({navs: doc}));
	});
}