var express = require('express');
var IntroModel = require("./../models/intro");
var Utils = require("./../utils");
var DBSuper = require("./../db/super");

exports.add = function() {
    return DBSuper.save(IntroModel);
}