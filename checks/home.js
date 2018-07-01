var Validator = require('./../utils/validator');

exports.intro = function(req, res, next) {
    var body = req.body;
    var title = body.title
    var slogan = body.slogan;
    // 主题概述
    var themeOverview = body.themeOverview;
    var intro = body.intro;
    var rules = [
        {
			value: title,
			type: String,
			name: '标题'
		},
		{
			value: slogan,
            type: String,
            rule: {
                min: 6
            },
            name: '标语',
        },
        {
			value: intro,
            type: String,
            rule: {
                min: 10,
                max: 60
            },
			name: '介绍信息'
        },
        {
			value: themeOverview ,
            type: String,
            rule: {
                min: 1,
                max: 6
            },
            name: '主题概述',
            message: '主题概述限制在1到6个字符之间'
		}
    ];
    
    var validate = Validator(rules);
    if (!validate.status) {
        return res.send(validate);
    }
    next();
}


exports.introId = function(req, res, next) {
    var body = req.body;
    var _id = body._id;
    var rules = [
		{
			value: _id,
			type: String,
			name: '介绍Id'
		}
    ];
    var validate = Validator(rules);
    if (!validate.status) {
        return validate;
    }
    req.body = {_id};
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

exports.map = function(req, res, next) {
    var body = req.body;
    var _id = body.introId;
    var themeId = body.themeId;
    var rules = [
        {
            name: '介绍Id',
            type: String,
            value: _id
        },
        {
            name: '主题Id',
            type: String,
            value: themeId
        }
    ];

    var validate = Validator(rules);
    if (!validate.status) {
        return validate;
    }   
    req.body = {
        models: {
           'themes._id': themeId,
           _id
        },
        params: {
            pagination: body.pagination,
            pageSize: body.pageSize
        }
    };
    next();
}

exports.mapItem = function(req, res, next) {
    var body = req.body;
    var _id = body.introId;
    var themeId = body.themeId;
    var mapId = body.mapId;
    var rules = [
        {
            name: '介绍Id',
            type: String,
            value: _id
        },
        {
            name: '主题Id',
            type: String,
            value: themeId
        },
        {
            name: '主题内容Id',
            type: String,
            value: themeId
        }
    ];

    var validate = Validator(rules);
    if (!validate.status) {
        return validate;
    }   
    req.body = {_id, "themes._id": themeId, "themes.map._id": mapId};
    next();
} 