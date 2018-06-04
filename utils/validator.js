/**
 * 验证方法
 */
var _validate = {
	_trim: function() {
		if (typeof value === 'string') {
			return value = value.replace(/\s/g, "");
		}
		return value;
	},
	_min: function() {
		if (typeof value === "string") {
			value = Validator.trim(value);
			return value.length >= min;
		}
		return value >= min;
	},
	_max: function(value, min) {
		if (typeof value === "string") {
			value = Validator.trim(value);
			return value.length <= this.max;
		}
		return value <= min;
	},
	_email: function(value) {
		var validatEmail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		return value.test(validatEmail);
	},
	_contrast: function(value, reducedValue) {
		return value === reducedValue;
	},
	_required: function(value) {
		value = Validator.trim(value);
		return !(value === "" || typeof value == 'undefined' || value.length == 0);
	},
	_type: function(value, type) {
		if (!type) {
			return true;
		}
		if (typeof type === 'string') {
			type = '[object '+type.name+']';
		} else {
			type = Object.prototype.toString.call(type);
		}
		return Object.prototype.toString.call(value) === type;
	}
}

function Validator(items = []) {
	for (var item of items) {
		// 指定规则类型
		var rules = item.rules,
		// 指定数据类型
		ruleTypes = item.type,
		// 必须属性
		required = item.required,
		// 字段value值
		value = item.value;
		// 字段中文名称
		name = item.name;

		// 基础判断
		if (!rules) {
			return {
				status: false,
				message: '请指定验证规则'
			};
		}

		if (!Validator.type(rules, Array)) {
			return {
				status: false,
				message: '期望验证规则是一个数组类型'
			};
		}

		// 值类型转换兼容
		if (Validator.type(ruleTypes, Function)) {
			ruleTypes = [ruleTypes];
		}
		
		// 值类型验证
		for (var i = 0; i < ruleTypes.length; i++) {
			var status = _validate._type(item.value, ruleTypes[i]);
			if (!status) {
				return {
					status: false,
					message: '名称为:'+name+'的值类型不匹配!'
				};
			}
		}

		// 规则验证
		for (var rule of rules) {
			// 字符串方法验证
			var ruleType = _validate.trim(rule.rule);
			ruleType = ruleType.split("|");
		    if (_validate.type(ruleType, String)) {
				var ruleName = Validator.trim(rule);
				var status = Validator[ruleName](value);
				if (!status) {
					return {
						status: false,
						message: rule.message
					};
				}
			} else if (Validator.type(rule, 'object')) {
				var key = Object.keys(rule)[0];
				var value = rule[key];
				var status = Validator[key](item.value, value);
				if (!status) {
					return {
						status: false,
						message: item.message
					};
				}
			}
		}

		return {
			status: true,
			message: 'ok'
		};
	}
}




module.exports = Validator;