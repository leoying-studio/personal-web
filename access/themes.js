const Themes = require('../models/themes');

exports.getAllById = function(themeId) {
    return Themes.find({themeId}).exec();
}

exports.updateThemeById = function(id) {
    return Themes.findOne({_id: id}).exec();
}

exports.removeById = function(id) {
    return Themes.findByIdAndRemove({_id: id}).exec();
}

exports.save = function(_id, fields) {
    if (!_id) {
        return Themes.create(fields);
    }
    return Themes.update({_id}, fields).exec();
}