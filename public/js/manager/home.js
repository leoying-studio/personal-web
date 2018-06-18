define(['jquery', 'api', 'config' ], function($, api, config) {
	// 外层父容器变量, 支持向下查找的方式，避免全局查找
	var main = $('#main'), asideBar = $('.aside-bar');
	var breadcrumb = main.find('.breadcrumb');

	// 业务常量
	var crumbs = ['intro'];

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
			var theme = {};
			if (!$("#themeTable").children().length) {
				theme = config.table.theme({}, {queryParams: function(params) {
					return {
						_id: r._id
					};
				}
			});
				$("#themeTable").bootstrapTable(theme);
			} else {
				$('#themeTable').bootstrapTable('refresh', {
					url: '/intro/theme/data?_id='+r._id,
					silent: true
				})
			}
			$("#intro").hide();
			$('#theme').show();
			insertCrumb('主题', 'theme');
		}
	};

	// 添加面包屑导航
	var insertCrumb = function(name, tick) {
		if (breadcrumb.find('a[tick='+tick+']').length) {
			return;
		}
		breadcrumb.children().last().children().removeClass('bread-active');
		breadcrumb.append(
			"<li>" +
					"<a href='#' class='bread-active' tick=" + tick + ">" + name + "</a>" +
			"</li>"	
		); 
		crumbs.push(tick);
		switcherCrumb(tick);
		breadcrumb.find('a').click(function() {
			breadcrumb.find('.bread-active').removeClass('bread-active');
			$(this).addClass('bread-active');
			var ctick = $(this).attr('tick');
			switcherCrumb(ctick);
		});
	}

	// 面包屑导航切换
	var switcherCrumb = function(tick) {
		tick = $('#'+tick);
		$(crumbs).each(function(index, item) {
			$('#'+item).hide();
		});
		tick.show();
	}

	var intro = config.table.intro(introEvents);;
	$('#introTable').bootstrapTable(intro);

	var refreshTbale = function() {
		$('#introTable').bootstrapTable('refresh');
	}

	$('#introNewly').click(function() {
		$('#intro').children(":not(:last-child)").hide().last().parent().children().last().show();
	});

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

	$("#intro > form>:last-child>:first-child").click(function() {
		$('#intro').children().last().hide().parent().children().first().show();
		refreshTbale();
	});

	$('#ThemeNewly').click(function() {
		$('#theme').hide();
		$('#themeForm').show();
		insertCrumb('新增主题', 'themeForm');
	});

	$('#themeForm button').click(function(e) {
		 var params = api.getParams($('#themeForm'));
		 $.post('/intro/themes/save', params).then(function(res) {
			 debugger;
		 });
	});
});


