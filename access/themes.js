var Themes = require('../access/themes');

exports.getAllById = function(themeId) {
    return Themes.find({themeId}).exec();
}

exports.updateThemeById = function(id) {
    return Themes.findOne({_id: id}).exec();
}

exports.removeThemeById = function(id) {
    return Themes.findByIdAndRemove({_id: id}).exec();
}

exports.save = function(fields) {
    return Themes.save(fields).exec();
}