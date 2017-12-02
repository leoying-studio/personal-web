var express = require('express');
var Nav = require("./../models/nav");
var Article = require("./../models/article");
var Body = require("./../config/body");

module.getAll = function(params) {
    return Promise.all([
        Nav.getAll(params.Nav),
        Banner.getAll(params.Banner)
    ]);
}
