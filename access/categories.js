var Categories = require('./../models/categories');

exports.getCategory = function (id) {
	return Categories.findById(id);
}

exports.save = function (id, name) {
	if (id) {
		return Categories.findByIdAndUpdate(id, {$set: {name} });
	}
	return Categories.create({
		name,
		children: []
	}).exec();
}

exports.all = function () {
	return Categories.find({});
}

exports.ChildByCategory = function (id, childId ,name) {
	if (!childId) {
		return Categories.findByIdAndUpdate(id, { $push: {name} });
	}
	return Categories.findByIdAndUpdate({_id: id, 'children._id': childId}, {$set: {name}});
}

exports.updateChild = function () {
	return Categories.findOneAndUpdate(conditions, {
		$set: model
	});
}

exports.updateCategory = function (id, model) {
	return Categories.findByIdAndUpdate(id, {
		$set: model
	});
}

exports.getChildrenByCategory = function(id) {
	return Categories.findById(id);
}

