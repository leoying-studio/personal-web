var express = require('express');
var IntroModel = require("./../models/intro");
var Utils = require("./../utils");
var DBSuper = require("./../dbsuper/index");

exports.add = function() {
    return DBSuper.save(IntroModel);
}