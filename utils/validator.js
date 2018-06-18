//维护基础功能验证
var _validate = {
	trim : function(value) {
		if (this.type(value, String)) {
			return value = value.replace(/\s/g, "");
		}
		return value;
	},
	
	
	min : function(value, min) {
		if (this.type(value, String)) {
			value = this.trim(value);
			return value.length >= min;
		}
		return value >= min;
	},
	
	max : function(value, max) {
		if (this.type(value, String)) {
			value = this.trim(value);
			return value.length < max;
		}
		return value <= min;
	},
	
	email : function(value) {
		var validatEmail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		return value.test(validatEmail);
	},
	
	required : function(value) {
		value = this.trim(value);
		return !(value === "" || typeof value == 'undefined' || value.length == 0);
	},
	
	contrast : function(value, reducedValue) {
		return value === reducedValue;
	},
	
	type : function(value, type) {
		if (!type) {
			return true;
		}
		type = '[object '+type.name+']';
		return Object.prototype.toString.call(value) === type;
	}
	
}

/**
 * @param {Array} rules 校验规则
 * @param {ruleTypes} ruleTypes 值类型
 * 基础参数校验
 */

var _typeValid = function(value, rules, ruleTypes) {
	// 数组类型验证
	if (_validate.type(ruleTypes, Function)) {
		ruleTypes = [ruleTypes];
	}
	
	// 类型验证
	var status = ruleTypes.every(function(type) {
		return !_validate.type(value, type); 
	});
	// 如果数据类型均不符合
	if (status) {
		return {
			status: false,
			message: '不包含期望的数据类型'
		};
	}


	return {
		status: true,
		message: 'ok'
	};
}

/**
 * 
 * @param {Array} rules 规则项
 * 验证规则项
 */
var _ruleValid = function(rules, value, name, message) {
	// 规则验证
	for (var rule of rules) {
		// 对象验证
		try {
			var t = _validate.type(rule, String)
			if (t) {
				if (!_validate[rule](value)) {
					return {
						status: false,
						message: message || name + "不符合格式规范!"
					}
				}
			} else {
				for(var key in rule) {
					if(!_validate[key](value, rule[key])) {
						return {
							status: false,
							message: message || name + '值不符合格式规范!'
						}
					}
				}
			}
		}catch(e)  {
			return {
				status: false,
				message: '规则参数异常'
			}
		}
	}
	return {
		status: true,
		message: 'ok'
	}
}

var _baseValid = function(value, name, ruleTypes) {
	if (!name) {
		return {
			status: false,
			message: '验证器的name属性不存在或者为空!'
		}
	}
	if (!ruleTypes) {
		return {
			status: false,
			message: '请指定'+name+'值类型!'
		}
	}
	if (!_validate.required(value)) {
		return {
			status: false,
			message: name + '值不存在'
		}
	}

	return {
		status: true,
		message: 'ok'
	}
}

function Validator(items = []) {
	for (var item of items) {
		// 验证项
		var rules = item.rule || item.rules || [];
		// 需要验证的值类型
		var ruleTypes = item.type;
		// 需要验证的值
		var value = item.value;
		// 中文名
		var name = item.name;
		// 错误提示消息
		var message = item.message;

		// 规则器基本参数验证
		var baseValid = _baseValid(value, name, ruleTypes);
		if (!baseValid.status) {
			return baseValid;
		}

		// 兼容转换规则
		if(_validate.type(rules, Object)) {
			rules = [rules];
		}

		// 进行基础校验
		var typeValid = _typeValid(value, rules, ruleTypes)
		if (!typeValid.status) {
			typeValid.message = name + typeValid.message;
			return typeValid;
		}
		// 规则验证
		var ruleValid = _ruleValid(rules, value, name, message);
		if (!ruleValid.status) {
			return ruleValid;
		}
	}

	return {
		status: true,
		message: 'ok'
	};
}


module.exports = Validator;