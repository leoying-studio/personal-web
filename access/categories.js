const Categories = require('./../models/categories');

exports.getById = function (id) {
	return Categories.findById(id);
}

exports.save = function (id, name) {
	if (id) {
		return Categories.findByIdAndUpdate(id, {$set: {name} });
	}
	return Categories.create({
		name,
		subcategories: []
	});
}

exports.all = function () {
	return Categories.find({});
}

exports.getSubcategoriesById = function (id, subcategoryId ,name) {
	if (!subcategoryId) {
		return Categories.findByIdAndUpdate(id, { $push: {name} });
	}
	return Categories.findByIdAndUpdate({_id: id, 'subcategories._id': subcategoryId}, {$set: {name}});
}

exports.updateSubcategory = function (id, subId, name) {
	let model = {
		$push: {
			subcategories: {name}
		}
	};
	if (subId) {
		model = {
			$set: {
				'subcategories.$.name': name
			}
		};
		return Categories.update({_id: id, 'subcategories._id': subId}, model);
	}
	return Categories.findByIdAndUpdate(id, model);
}

exports.updateCategory = function (id, model) {
	return Categories.findByIdAndUpdate(id, {
		$set: model
	});
}


exports.destorySubcategoryById =  function(cateId, subId) {
	let execute = Categories.update({_id: cateId}, {$pull: {"subcategories": {_id: subId}}});
	return execute;
}