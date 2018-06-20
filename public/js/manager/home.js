define(['jquery', 'api', 'config' ], function($, api, config) {
	// 外层父容器变量, 支持向下查找的方式，避免全局查找
	var main = $('#main'), asideBar = $('.aside-bar');
	var breadcrumb = main.find('.breadcrumb');
	var toolbar = $('#toolbar');
	var addbutton = toolbar.find('button');
	var table = $('#table');
	// 业务常量
	var crumbs = [];
	/**
	 * 
	 * @param {Object} config 配置信息
	 */
	var initializeTable = function(config) {
		table.bootstrapTable('destroy').bootstrapTable(config);
	}

	// 面包屑导航切换
	var switchBread= function(step) {
		
	}
	
	// 添加面包屑导航
	var insertBread = function(name, step) {
		breadcrumb.find('.bread-active').removeClass('bread-active');
		var bread = breadcrumb.find('a[step='+step+']');
		if (bread.length) {
			bread.addClass('bread-active');
			return;
		}
		breadcrumb.append(
			"<li>" +
					"<a href='#' class='bread-active' step=" + step + ">" + name + "</a>" +
			"</li>"	
		); 
	}

	insertBread('介绍', '110');	


	addbutton.click(function() {
		var nextstep = $(this).attr('nextstep'); 
		table.parents('section').hide();
		$(nextstep).show();
	});


	var themeEvents = {
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
						refreshTbale();
					 } else {
						api.message.error(res.message);
					 }
				});
			}
		},
		'click .label[name=theme]': function(e, f, r) { 
			$('#intro').hide();
		},
	};

	var introEvents = {
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
			 var theme = config.table.theme({}, {queryParams: function(params) {
					return {
						_id: r._id
					};
				}
			});
			initializeTable(theme);
			insertBread('主题', '#themeForm');
		}
	};

	

	var intro = config.table.intro(introEvents);

	initializeTable(intro);


	$("#intro > form>:last-child>:last-child").click(function() {
		 var form = $('#intro > form');
		 var _id = form.attr('_id');
		 var params = api.getParams(form);
		 params._id = _id;
		 $.post('/intro/save', params).then(function(res) {
			  if (res.status) {
				  api.clearValues(form);
				  form.attr('_id', '');
				  api.message.success('保存成功');
				  refreshTbale();
			  } else {
				  api.message.error(res.message);
			  }
		 });
	});			



	$('#themeForm button').click(function(e) {
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


