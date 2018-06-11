define([
	'require',
	'invok',
	'jquery'
], function(require, invok, $) {
	var request = {
		get: function(url, fn) {
			return $.ajax({
				url: url,
				dataType: 'json',
				type: 'get',
				success: function(res) {
					return res;
				},
				error: function(res) {
					invok.message.error("请求错误");
					console.error(res);
				}	
			}); 
		},
		post: function(url, params) {
			return  $.ajax({
				url: url,
				dataType: 'json',
				data: params,
				type: 'post',
				success: function(res) {
					if (res.status) {
						invok.message.success(res.message);
					} else {
						invok.message.error(res.message);
					}
				},
				error: function(res) {
					invok.message.error("请求错误");
					console.error(res);
				}
			});
		}
	}
	return request;
});