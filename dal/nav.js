var express = require('express');
var Nav = require("./../models/nav");
var Utils = require("./../utils");
var DBSuper = require("./../dbsuper/index");

exports.getAll = function() {
    return DBSuper.findAll(Nav);
}

exports.add = function(schema) {
    return DBSuper.save(schema);
}

