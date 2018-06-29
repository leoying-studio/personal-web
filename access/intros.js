
import Intros from './../model/intros';
export default class {
	static async save(id, conditions, model) {
		try {
			if (!id) {
				let intro = await Intros.findOne({apply: true});
				if (!intro) {
					return await Intros.create(models);
				}
				await intro.update({apply: false});
			} else {
				return await Intros.create(models);
			}
		}catch(e) {
			return e;
		}
	}

	static async destory(id) {
		return await Intros.findByIdAndRemove(id);
	}

	static async saveTheme(id, themeId, topicMap, headline) {
		var fields = {
			$push: {
				themes: {
					map: [],
					topicMap,
					headline
				}
			}
		};
		if (themeId) {
			fields = {
				$set: {
					topicMap,
					headline
				} 
			}
		}
		return await Intros.update({id}, fields);
	}


	static async list() {
		return await Intros.queryPaging({pagination: 1, pageSize: 9999});
	}

	static saveByTheme(id, themeId, model) {
		var fields = {
			$push: {
				map: {
					theme: {
						discriptiveGraph,
						presentation
					}
				}
			}
		};
		if (themeId) {
			fields = {
				$set: {
					map: {
					   theme: {
							discriptiveGraph,
							presentation
					   }
					}
				}
			};
		}
		return Intros.findByIdAndUpdate(id, fields);
	}

	static async getListByTheme(pagination = 1) {
		var start = (pagination - 1) * 4;
		var end = pagination * 4;
		return await IntrosModel.findOne({apply: true}).populate('themes', {slice: [start, end]});
	}

	static destoryThemeItemById(themeId) {
		return new Promise(function(resolve, reject) {
			Intros.findOne({apply: true}, function(err, doc) {
				if (err) {
					return reject(err);
				}
				doc.remove(function(doc) {
					resolve(doc);
				});
			});
		});
	}

	static destoryThemeById(themeId) {
		return new Promise(function(resolve, reject) {
			Intros.findOne({apply: true}, function(err, doc) {
				if (err) {
					return reject(err);
				}
				doc.remove(function(doc) {
					resolve(doc);
				});
			});
		});
	}

	
}
