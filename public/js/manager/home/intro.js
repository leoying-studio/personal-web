define(['jquery', 'api'], function($, api) {
	// 外层父容器变量, 支持向下查找的方式，避免全局查找
	var main = $('#main'), asideBar = $('.aside-bar');
	var breadcrumb = main.find('.breadcrumb');
	var table = $('#table');
	var toolbar = $('#toolbar');
	var buttons= toolbar.find('button');
	var form = $('#form');
	var saveBtn = $("#saveBtn");

	var getIntroInfo = function() {
		$.get('/intro/data').then(function(data) {
			api.setValues(form, data);
		}, function() {
			api.message.error('数据请求异常');
			throw new Error(e);
		});
	}

	getIntroInfo();

	// 保存数据
	saveBtn.click(function() {
		var params = api.getParams(form);
		$.post('/intro/save', params).then(function(res) {
			 if (res.status) {
				 // 修改成功，重新获取一下数据
				 getIntroInfo();
				 api.message.success('保存成功');
			 } else {
				 api.message.error(res.message);
			 }
		});
	});

});


