var express = require('express');
var app = express();

var state = {
	success: 200,
	unknown: 1001,  // 未知错误
	validate: 1002, // 验证错误
	params: 1004,   // 参数错误
	permissions: 1003,  //权限错误,
	operation: 1005
};

module.exports = function Body(option) {
	// 数据正常
	if (!option.code) {
		return {
			code: state.success,
			data: option,
			msg: 'success',
			status: true
		};
	}
	// 数据错误
	return {
		code: state[option.code],
		data: {},
		msg: option.msg || 'error',
		status: false
	};
}

