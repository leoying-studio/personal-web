function Validator(validateList) {
	for (var item of validateList) {
		var typeStr = item.type;
		var conditions = item.conditions || {};
		var status = null;
		try {
			var types = typeStr.split(",");
			for (var type of types) {
				type = Validator.trim(type);
				if (type === "contrast") {
					status = Validator[type](conditions.value, conditions.reducedValue );
				} else if (type === "len") {
					status = Validator[type](item.value, conditions.min, conditions.max);
				} else {
					status = Validator[type](item.value);
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
				message: "验证出错,检查参数类型是否合法"
			}
		}
	}
}

Validator.trim = function(value) {
	return value = value.replace(/\s/g, "");
}

Validator.len = function(value, min, max) {
	var afterValue = Validator.trim(value);
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

module.exports = Validator;