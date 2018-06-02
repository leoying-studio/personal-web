var Validator = require('./../utils/validator');

exports.add = function(req, res, next) {
    var validate = Validator([
		{rules: [{rule: 'required'}], value: body.title, name: '标题'},
		{
			rules: [
				{
					rule: {min: 10, max: 3000},
					message: '文章内容不能少于十个字符'
				}
            ],
            name: '文章内容',
			value: body.content,
			type: String
		},
		{
			rules: [{
				rule: {min: 1},
				message: "请至少选择一个分类"
			}], 
            type: Array,
            name: '分类',
			value: body.childrenId
		}
	]);
	if (!validate.status) {
		req.body.message = validate.message;
		return next();
    }
    req.body = {
        title: body.title,
		img: body.img,
		categoryId: body.categoryId,
		childrenId: body.childrenId,
		description: body.description,
		recommend: body.recommend || false,
		recommendImg: body.recommendImg || '',
		content: body.content
    };
    next();
}