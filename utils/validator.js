function Validator(items = []) {
	for (var item of items) {
		var rules = item.rules;
		var ruleTypes = item.type;

		// 基础判断
		if (!rules) {
			return {
				status: false,
				message: '请指定验证规则'
			};
		}
		// 类型判断
		if (!Validator.type(rules, 'Array')) {
			return {
				status: false,
				message: '期望验证规则是一个数组类型'
			};
		}
		// 数组类型验证
		if (Validator.type(ruleTypes, 'Function')) {
			ruleTypes = [ruleTypes];
		}
		
		// 类型验证
		for (var i = 0; i < ruleTypes.length; i++) {
			var status = Validator.type(item.value, ruleTypes[i]);
			if (!status) {
				return {
					status: false,
					message: '值类型不匹配'
				};
			}
		}

		// 规则验证
		for (var rule of rules) {
			// 字符串方法验证
		    if (Validator.type(rule, 'string')) {
				var ruleType = Validator.trim(rule);
				var status = Validator[ruleType](item.value);
				if (!status) {
					return {
						status: false,
						message: item.message
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



Validator.trim = function(value) {
	if (typeof value === 'string') {
		return value = value.replace(/\s/g, "");
	}
	return value;
}


Validator.min = function(value, max) {
	if (typeof value === "string") {
		value = Validator.trim(value);
		return value.length >= min;
	}
	return value >= min;
}

Validator.max = function(value, min) {
	if (typeof value === "string") {
		value = Validator.trim(value);
		return value.length <= this.max;
	}
	return value <= min;
}

Validator.email = function(value) {
	var validatEmail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	return value.test(validatEmail);
}

Validator.required = function(value) {
	value = Validator.trim(value);
	return !(value === "" || typeof value == 'undefined' || value.length == 0);
}

Validator.contrast = function(value, reducedValue) {
	return value === reducedValue;
}

Validator.type = function(value, type) {
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

module.exports = Validator;