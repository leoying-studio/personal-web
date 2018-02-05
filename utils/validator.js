function Validator(validateList = []) {
	for (var item of validateList) {
		var modeStr = item.mode;
		var conditions = item.conditions || {};
		var status = null;
		try {
			// 验证type 
			var t = Validator.type(item.value, item.type);
			if (!t) {
				return {
					status: false,
					message: "参数不是期望类型"
				};
			}
			var modes = modeStr.split(",");
			for (var mode of modes) {
				mode = Validator.trim(mode);
				if (mode === "contrast") {
					status = Validator[mode](conditions.value, conditions.reducedValue );
				} else if (mode === "len") {
					status = Validator[mode](item.value, conditions.min, conditions.max);
				} else {
					status = Validator[mode](item.value);
				}
				if (!status) {
					return {
						status: false,
						message: item.message
					};
				}
				return {
					status: true,
					message: "ok"
				}
			}
		} catch(e) {
			return {
				status: false,
				message: "验证异常"
			}
		}
	}
}

Validator.trim = function(value) {
	return value = value.replace(/\s/g, "");
}

Validator.len = function(value, min, max) {
	var afterValue = Validator.trim(value);
	min = min || 0;
	max = max || Infinity;
	return value.length >= min && value.length <= max;
}

Validator.email = function(value) {
	var validatEmail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	return value.test(validatEmail);
}

Validator.required = function(value) {
	value = Validator.trim(value);
	return !value === "";
}

Validator.contrast = function(value, reducedValue) {
	return value === reducedValue;
}

Validator.type = function(value, type) {
	if (!type) {
		return true;
	}
	return Object.prototype.toString.call(value) === Object.prototype.toString.call(type);
}

module.exports = Validator;