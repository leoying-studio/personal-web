var Banner = require("./banner");
var Intro = require("./intro");
var Nav = require("./nav");

exports.getAll = function() {
    return Promise.all([
        Nav.getAll(Nav),
        Banner.getAll(Banner)
    ]);
}