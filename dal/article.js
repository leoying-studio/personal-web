var express = require('express');
var router = express.Router();
var ArticleModel = require("./../models/article");
var Body = require("./../config/body");
var DBSuper = require("./../dbsuper/index");

exports.add = function() {
    return DBSuper.save(ArticleModel);
}

exports.get = function(condtion) {
	return DBSuper.find(condtion);
}



