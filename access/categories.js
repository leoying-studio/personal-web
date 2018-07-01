var Categories = require('./../models/categories');

exports.getCategory = function(id) {
	return Categories.findById(id);
}

exports.all = function(){
	return Categories.find({});
}

exports.addChild = function() {
	return Categories.update(conditions, {$push: model});
}

exports.updateChild = function() {
	return Categories.findOneAndUpdate(conditions, {
		$set : model
	});
}

exports.updateCategory = function(id, model) {
	return Categories.findByIdAndUpdate(id, {
		$set : model
	});
}



