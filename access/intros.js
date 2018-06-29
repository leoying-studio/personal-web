var Intros = require('./../model/intros');

exports.save = function(id, models) {
	
	new Promise(function(resolve, reject) {
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
						Intros.create(models);
					});
				} 
				create();
			});
		}
	});
}