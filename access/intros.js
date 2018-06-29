var Intros = require('./../model/intros');

exports.save = function(id, conditions, model) {
	return new Promise(function(resolve, reject) {
		var create = function() {
			Intros.create(models).then(function(doc) {
				resolve(doc);
			}).catch(function(err) {
				reject(err);
			});
		}
		if (!id) {
			Intros.findOne({apply: true}, function(err, doc) {
				if (err) {
					return reject(err);
				}
				if (doc) {
					doc.update({apply: false}, function(err, doc) {
						if (err) {
							return reject(err);
						}
						create();
					});
				} 
				create();
			});
		} else {
			Intros.update(conditions, {$set: model}, function(err, doc) {
				if (err) {
					return reject(err);
				}
				resolve(doc);
			});
		}
	});
}

exports.destory = function(id) {
	return Intros.findByIdAndRemove(id);
}


exports.list = function() {
	return Intros.queryPaging({pagination: 1, pageSize: 9999});
}


exports.saveTheme = function(id, themeId, topicMap, headline) {
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
    return Intros.update({id}, fields);
}


exports.saveByTheme = function(id, themeId, model) {
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


exports.getListByTheme = function(pagination = 1) {
    var start = (pagination - 1) * 4;
    var end = pagination * 4;
	return IntrosModel.findOne({apply: true}).populate('themes', {slice: [start, end]});
}


exports.destoryThemeItemById = function(themeId) {
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


exports.destoryThemeById = function(themeId) {
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