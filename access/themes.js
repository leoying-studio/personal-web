const Themes = require('../models/themes');

exports.getAll = function(themeId) {
    return Themes.find({themeId}).exec();
}

exports.find= function(id, callback) {
    return Themes.findById(id).exec(callback);
}

exports.remove = function(id) {
    return Themes.findByIdAndRemove(id).exec();
}

exports.add = function(field) {
    return Themes.create(field);
}

exports.update = function(id, fields) {
    return Themes.update({_id: id}, fields).exec();
}
