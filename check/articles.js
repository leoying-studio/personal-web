var Validator = require('./../utils/validator');

exports.add = function(req, res, next) {
    var body = req.body;
	var title = body.title;
	var img = body.img;
	var description = body.description;
	var categoryId = body.categoryId;		
	var recommend = body.recommend || false;
	var childrenId = body.childrenId;
	var content = body.content;
    var recommendImg = body.recommendImg;
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
    next();
}