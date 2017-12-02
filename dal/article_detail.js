var express = require('express');
var ArticleDetailModel = require("./../models/article_detail");
var Body = require("./../config/body");
var DBSuper = require("./../dbsuper/index");

exports.add = function() {
    return DBSuper.save(ArticleDetailModel);
}

exports.list = function(params) {
    return DBSuper.findOne({
        model: ArticleDetailModel,
        params: params
    });
}


