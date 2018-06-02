//维护基础功能验证
var _validate = {
	_trim : function(value) {
		if (typeof value === 'string') {
			return value = value.replace(/\s/g, "");
		}
		return value;
	},
	
	
	_min : function(value, max) {
		if (typeof value === "string") {
			value = this._trim(value);
			return value.length >= min;
		}
		return value >= min;
	},
	
	_max : function(value, min) {
		if (typeof value === "string") {
			value = this._trim(value);
			return value.length <= this.max;
		}
		return value <= min;
	},
	
	_email : function(value) {
		var validatEmail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		return value.test(validatEmail);
	},
	
	_required : function(value) {
		value = this._trim(value);
		return !(value === "" || typeof value == 'undefined' || value.length == 0);
	},
	
	_contrast : function(value, reducedValue) {
		return value === reducedValue;
	},
	
	_type : function(value, type) {
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

/**
 * @param {Array} rules 校验规则
 * @param {ruleTypes} ruleTypes 值类型
 * 基础参数校验
 */

var _baseValid = function(rules, ruleTypes) {
	// 数组类型验证
	if (_validate._type(ruleTypes, 'Function')) {
		ruleTypes = [ruleTypes];
	}
	
	// 类型验证
	for (var i = 0; i < ruleTypes.length; i++) {
		var status = _validate._type(item.value, ruleTypes[i]);
		if (!status) {
			return {
				status: false,
				message: name +'不是期望的数据类型'
			};
		}
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
var _typeValid = function(rules, value) {
	// 规则验证
	for (var rule of rules) {
		// 对象验证
		var r = rule.rule;
		var m = rule.message;
		try {
			var v = _validate._type(value, String)
			if (v) {
				if (!_validate[v](value)) {
					return {
						status: false,
						message: m
					}
				}
			} else {
				for(var key in r) {
					if(!_validate[key](r[key])) {
						return {
							status: false,
							message: m
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

		// 基础验证, 判断值是否存在
		if (!_validate._required(value)) {
			return {
				status: false,
				message: name + '值不存在'
			}
		}

		// 兼容转换规则
		if(_validate._typeValid(rules, Object)) {
			rules = [rules];
		}

		// 进行基础校验
		var baseValid = _baseValid(rules, ruleTypes)
		if (!baseValid.status) {
			return baseValid;
		}
		// 规则验证
		var ruleValid = _ruleValid(rules, value);
		if (!ruleValid.status) {
			return baseValid;
		}
	}

	return {
		status: true,
		message: 'ok'
	};
}


module.exports = Validator;