var express = require('express');
var NavModel = require("./../models/nav");
var ArticleModel = require("./../models/article");
var ArticleDetailModel = require("./../models/article_detail");
var Utils = require("./../utils");
var DBSuper = require("./../db/super");

exports.getAll = function () {
    return DBSuper.findAll(NavModel);
}

exports.add = function (schema) {
    return DBSuper.save(schema);
}

exports.updates = function (conditions) {
    var updates = { $set: conditions };
    return NavModel.update(conditions, updates, cb).lean();
}

exports.del = function (conditions, cb) {
    // NavModel.remove(conditions).then(function (nav) {
    //     ArticleModel.remove(conditions).then(function (article) {
    //         ArticleDetailModel.remove(conditions).then(cb);
    // });
}

