var express = require('express');
var ArticleDetailModel = require("./../models/article_detail");
var Body = require("./../config/body");
var DBSuper = require("./../dbsuper/index");

exports.get = function(fields) {
    return DBSuper.findOne({
        model: ArticleDetailModel,
        fields
    });
}

exports.save = function(fields) {
    var model = new ArticleDetailModel(fields);
    return DBSuper.save(model);
}
