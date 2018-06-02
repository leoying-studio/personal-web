var Validator = require('./../utils/validator');

exports.save = function(res, res, next) {
    var body = req.body;
    var rules = [
		{
			value: body.categoryId,
			type: String,
			name: '类别Id'
		},
		{
			value: params.pagination,
			type: Number,
			name: '页码'
		}
	];
	var validate = Validator(rules);
}