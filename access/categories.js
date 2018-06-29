import Categories from './../model/categories';
export default class {
	static getCategory(id) {
		return Categories.findById(id);
	}

	static list(){
		return Categories.find({});
	}

	static addChild() {
		return Categories.update(conditions, {$push: model});
	}

	static updateChild() {
		return Categories.findOneAndUpdate(conditions, {
			$set : model
		});
	}

	static updateCategory (id, model) {
		return Categories.findByIdAndUpdate(id, {
			$set : model
		});
	}
}


