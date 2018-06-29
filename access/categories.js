var Categories = require('./../model/categories');

exports.getCategory = function(id) {
	return Categories.findById(id);
}

exports.list = function() {
	return Categories.find({});
}

exports.addChild = function(conditions, model) {
	return Categories.update(conditions, {$push: model});
}

exports.updateChild = function(conditions, model) {
	return Categories.findOneAndUpdate(conditions, {
        $set : model
    });
}
exports.updateCategory = function(id, model) {
	return Categories.findByIdAndUpdate(id, {
        $set : model
    });
}