var express = require('express');
var Banner = require("./../models/banner");
var Utils = require("./../utils");
var DBSuper = require("./../db/super");

exports.getAll = function() {
    return DBSuper.findAll(Banner);
}

exports.add = function(schema) {
    return DBSuper.save(schema);
}
