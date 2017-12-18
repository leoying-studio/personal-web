var express = require('express');
var NavDal = require("./nav");
var Utils = require("./../utils");
var DBSuper = require("./../dbsuper/index");

exports.getNavs = function() {
    return NavDal.getAll();
}