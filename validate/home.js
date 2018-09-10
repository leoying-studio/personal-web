let Validator = require('./../utils/validator');

exports.intro = function(req, res, next) {
    let body = req.body;
    let title = body.title
    let slogan = body.slogan;
    // 主题概述
    let themeOverview = body.themeOverview;
    let intro = body.intro;
    let rules = [
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
    
    let validate = Validator(rules);
    if (!validate.status) {
        return res.send(validate);
    }
    next();
}


exports.introId = function(req, res, next) {
    let body = req.body;
    let _id = body._id;
    let rules = [
		{
			value: _id,
			type: String,
			name: '介绍Id'
		}
    ];
    let validate = Validator(rules);
    if (!validate.status) {
        return validate;
    }
    req.body = {_id};
    next();
}

exports.children = function(req, res, next) {
    let body = req.body;
    let rules = [
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
    let validate = Validator(rules);
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
    let params = req.query;
    let rules = [
		{
			value: body.categoryId,
			type: String,
			name: '类别Id'
		}
	];
    let validate = Validator(rules);
    if (!validate.status) {
        return validate;
    }
    req.body = {
        _id: body.categoryId
    };
    next();
}

exports.map = function(req, res, next) {
    let body = Object.assign(req.body, req.query, req.params);
    let themeId = body.themeId;
    let rules = [
        {
            name: '主题Id',
            type: String,
            value: themeId
        }
    ];
    let validate = Validator(rules);
    if (!validate.status) {
        return validate;
    }   
    next();
}

exports.mapItem = function(req, res, next) {
    let body = req.body;
    let _id = body._id;
    let themeId = body.themeId;
    // let mapId = body.mapId;
    let rules = [
        {
            name: '主题id',
            type: String,
            value: _id
        },
        // {
        //     name: '主题Id',
        //     type: String,
        //     value: themeId
        // },
        // {
        //     name: '主题内容Id',
        //     type: String,
        //     value: themeId
        // }
    ];

    let validate = Validator(rules);
    if (!validate.status) {
        return validate;
    }   
    next();
} 

exports.theme = function (req, res, next) {
    let {illustrating, headline} = req.body;
    let rules = [
        {
            name: '主题图',
            type: String,
            value: illustrating
        },
        {
            name: '主题标题',
            type: String,
            value: headline
        }
    ];

    let validate = Validator(rules);
    if (!validate.status) {
        return res.send(validate);
    }  
    next();
}