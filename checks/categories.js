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
			value: body.children,
			type: Array,
			name: '子类'
        },
        {
			value: body.name,
            type: String,
            rule: {
                min: 1,
                max: 6
            },
			name: '类别名称'
		}
	];
    var validate = Validator(rules);
    if (!validate.status) {
        return validate;
    }
    req.body = {
        categoryId: body.categoryId,
        children: body.children
    };
    next();
}

exports.children = function(res, res, next) {
    var body = req.body;
    var rules = [
		{
			value: body.categoryId,
			type: String,
			name: '类别Id'
		},
        {
			value: body.name,
            type: String,
            rule: {
                min: 1,
                max: 6
            },
			name: '类别名称'
		}
	];
    var validate = Validator(rules);
    if (!validate.status) {
        return validate;
    }
    req.body = {
        categoryId: body.categoryId,
    };
    req.modes = {
        children: {name: body.name}
    };
    next();
}


exports.query = function(res, req, next) {
    var params = req.query;
    var rules = [
		{
			value: body.categoryId,
			type: String,
			name: '类别Id'
		}
	];
    var validate = Validator(rules);
    if (!validate.status) {
        return validate;
    }
    req.body = {
        _id: body.categoryId
    };
    next();
}