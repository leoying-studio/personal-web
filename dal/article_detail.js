var express = require('express');
var ArticleDetailModel = require("./../models/article_detail");
var NavDAL = require("./../dal/nav");
var Body = require("./../config/body");
var DBSuper = require("./../dbsuper/index");

exports.get = function(conditions, cb) {
    var params = {
        model:ArticleDetailModel,
        conditions
    };
    return DBSuper.findOne(params).then(function(article_detail) {
        NavDAL.getAll().then(function(navs) {
            cb({article_detail, navs});
        });
    }, function() {
        console.log();
    })
}

exports.save = function(fields) {
    var model = new ArticleDetailModel(fields);
    return DBSuper.save(model);
}
