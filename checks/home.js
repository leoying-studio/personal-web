var Validator = require('./../utils/validator');

exports.intro = function(req, res, next) {
    var body = req.body;
    var title = body.title
    var slogan = body.slogan;
    var headline = body.headline;
    var intro = body.intro;
    var _id = body.id;
    var rules = [
        {
			value: title,
			type: String,
			name: '标题不能为空'
		},
		{
			value: slogan,
            type: String,
            rule: {
                min: 6
            },
			name: '提示标语不能为空'
        },
        {
			value: intro,
            type: String,
            rule: {
                min: 10,
                max: 60
            },
			name: '介绍信息不能为空'
        },
        {
			value: headline ,
            type: String,
            rule: {
                min: 1,
                max: 6
            },
			name: '主题标题不能为空'
		}
    ];
    
    var validate = Validator(rules);
    if (!validate.status) {
        return res.send(validate);
    }
    req.body = {
        models: {
            title,
            slogan,
            intro,
            headline,
            apply: true,
            themes: []
        },
        conditions: {
            _id
        }
    }
    next();
}


exports.introId = function(req, res, next) {
    var body = req.body;
    var rules = [
		{
			value: body.id,
			type: String,
			name: '介绍Id'
		}
    ];
    var validate = Validator(rules);
    if (!validate.status) {
        return validate;
    }
    req.body = {_id: body.id};
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