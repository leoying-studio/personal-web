var Validator = require('./../utils/validator');

exports.add = function(req, res, next) {
    var body = req.body;
    var rules = [
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
        name: body.name,
        children: body.children
    };
    next();
}

exports.update = function(req, res, next) {
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
        _id: body.categoryId,
        children: body.children
    };
    req.models = {
        name: body.name,
        children: body.children
    };
    next();
}

exports.children = function(req, res, next) {
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


exports.updateChild = function(req, res, next) {
    var body = req.body;
    var rules = [
		{
			value: body.categoryId,
			type: String,
			name: '类别Id'
        },
        {
            value: body.childId,
			type: String,
			name: '子类Id'
        },
        {
            value: body.name,
			type: String,
			name: '子类名称'
        }
	];
    var validate = Validator(rules);
    if (!validate.status) {
        return validate;
    }
    req.body = {
        _id: body.categoryId,
        'children.id': body.childId
    };
    req.models = {
        'children.name': body.name
    };
    next();
}

exports.query = function(req, res, next) {
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