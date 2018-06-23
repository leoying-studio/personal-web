define(['jquery', 'api', 'config' ], function($, api, config) {
	// 外层父容器变量, 支持向下查找的方式，避免全局查找
	var main = $('#main'), asideBar = $('.aside-bar');
	var breadcrumb = main.find('.breadcrumb');
	var toolbar = $('#toolbar');
	var addbutton = toolbar.find('button');
	var table = $('#table');
	// 业务常量

	var events = {
		theme: {
			'click .label[name=edit]': function(e, f, r) {
				$('.intro').children(":not(:last-child)").hide().last().parent().children().last().show();
				var form = $('#intro > form');
				form.attr('_id', r._id);
				api.setValues(form, r);
			},
			'click .label[name=destory]': function(e, f, r) {
				if (confirm('确认删除吗?')) {
					$.post('/intro/destory', {
						_id: r._id
					}).then(function(res) {
						 if (res.status) { n
							api.message.success('删除成功');
							api.refreshTbale();
						 } else {
							api.message.error(res.message);
						 }
					});
				}
			},
			'click .label[name=theme]': function(e, f, r) { 
				$('#intro').hide();
			}
		},
		intro: {
			'click .label[name=edit]': function(e, f, r) {
				$('.intro').children(":not(:last-child)").hide().last().parent().children().last().show();
				var form = $('.intro > form');
				form.attr('_id', r._id);
				api.setValues(form, r);
			},
			'click .label[name=destory]': function(e, f, r) {
				if (confirm('确认删除吗?')) {
					$.post('/intro/destory', {
						_id: r._id
					}).then(function(res) {
						 if (res.status) {
							api.message.success('删除成功');
							refreshTbale();
						 } else {
							api.message.error(res.message);
						 }
					});
				}
			},
			'click .label[name=theme]': function(e, f, r) { 
				var queryParams = {
					queryParams: function(params) {
						return {
							_id: r._id
						};
					}
				};
				api.initTable('theme', {}, queryParams);
				api.insertBread('主题', 'theme', events);
				addbutton.attr('nextstep', '#themeForm');
				$("#themeForm").attr('_id', r._id);
			}
		}
	};

	api.initTable('intro', events.intro);


	$('#introNewly').click(function() {
		$('#intro').hide();
		$("#introForm").show();
	});

	$('#introForm button').click(function() {
		$("#introForm").hide();
		api.showTable();
	})

	$("#intro > form>:last-child>:last-child").click(function() {
		 var form = $('#intro > form');
		 var _id = form.attr('_id');
		 var params = api.getParams(form);
		 params._id = _id;
		 $.post('/intro/save', params).then(function(res) {
			  if (res.status) {
				  api.clearValues(form);
				  api.message.success('保存成功');
			  } else {
				  api.message.error(res.message);
			  }
		 });
	});			



	$('#themeForm button').click(function(e) {
		 var index = $(this).index();
		 if (index === 0) {
			$('#themeForm').hide();
			api.showTable();
			api.refreshTable();
			return;
		 }
		 var params = api.getParams($('#themeForm'));
		 var _id = $("#themeForm").attr('_id');
		 params._id = _id;
		 $.post('/intro/themes/save', params).then(function(res) {
			 if (res.status) {
				 api.message.success('保存成功');
				 api.clearValues($('#themeForm'));
			 } else {
				api.message.error(res.message);
			 }
		 });
	});
});


