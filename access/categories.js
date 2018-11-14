const Categories = require('./../models/categories');

exports.find = function (id) {
	return Categories.findById(id);
}

exports.add = function(name) {
	return Categories.create({
		name,
		subcategories: []
	});
}

exports.save = function (id, name) {
	return Categories.findByIdAndUpdate(id, {$set: {name} });
}

exports.findAll = function () {
	return Categories.find({});
}

exports.addSubcategory = function(id, name) {
	return Categories.findByIdAndUpdate(id, { $push: {
		subcategories: {name}} 
	});
}

exports.updateSubcategory = function(id, subId, name) {
	return Categories.findByIdAndUpdate({_id: id, 'subcategories._id': subId}, {$set: {'subcategories.$.name': name}});
}


exports.updateCategory = function (id, model) {
	return Categories.findByIdAndUpdate(id, {
		$set: model
	});
}


exports.destorySubcategory=  function(cateId, subId) {
	return Categories.update({_id: cateId}, {$pull: {"subcategories": {_id: subId}}});
}