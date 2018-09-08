var Validator = require('./../utils/validator');

exports.save = function(req, res, next) {

    var body = req.body;
    var rules = [
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
        return res.send({
            status: false,
            message: validate.message
        });
    }
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

exports.subCategories = function(req, res, next) {
    var body = req.body;
    var rules = [
		{
			value: body.cateId,
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
        return res.send({
            status: false,
            message: validate.message
        });
    }
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