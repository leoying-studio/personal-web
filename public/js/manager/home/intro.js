define(['jquery', 'api', 'config', 'aside'], function($, api, config, aside) {
	// 外层父容器变量, 支持向下查找的方式，避免全局查找
	var main = $('#main'), asideBar = $('.aside-bar');
	var breadcrumb = main.find('.breadcrumb');
	var toolbar = $('#toolbar');
	var buttons= toolbar.find('button');
	var addbutton = buttons.eq(0);

	// 业务常量
	var events = {
		theme: {
			'click .label[name=edit]': function(e, f, r) {
				api.hideTable();
				var form = $('#themeForm');
				form.attr('themeId', r._id);
				api.setValues(form, r);
				form.show();
			},
			'click .label[name=destory]': function(e, f, r) {
				if (confirm('确认删除吗?')) {
					$.post('/intro/themes/destory', {
						themeId: r._id
					}).then(function(res) {
						if (res.status) {
							api.message.success('删除成功');
							api.refreshTable();
						 } else {
							api.message.error(res.message);
						 }
					})
				}
			}
		},
		intro: {
			'click .label[name=edit]': function(e, f, r) {
				api.hideTable();
				var form = $('#introForm');
				form.attr('_id', r._id);
				api.setValues(form, r);
				form.show();
			},
			'click .label[name=destory]': function(e, f, r) {
				if (confirm('确认删除吗?')) {
					$.post('/intro/destory', {
						_id: r._id
					}).then(function(res) {
						 if (res.status) {
							api.message.success('删除成功');
							api.refreshTable();
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
				api.initTable('theme', events.theme, queryParams);
				api.insertBread('主题', 'theme', events);
				addbutton.attr('nextstep', '#themeForm');
				$("#themeForm").attr('_id', r._id);
			}
		}
    };
    
    aside.switchToIntro(function() {
        initIntro();
    });

    var initIntro = function() {
        api.initTable('intro', events.intro);
        api.removeAllBread();
        api.insertBread('介绍', 'intro', events);
        buttons.not(':first-child').hide();
    }

    initIntro();

	$('#introNewly').click(function() {
		$('#intro').hide();
		$("#introForm").show();
	});

	addbutton.click(function() {
		$('#themeForm').removeAttr('themeId');
	});

	$('#introForm button').click(function() {
		var index = $(this).index();
		if (index === 0) {
			$("#introForm").hide();
			api.showTable();
			api.refreshTable();
			return;
		}
		var form = $('#introForm');
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
	})

		

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
		 var themeId = $("#themeForm").attr('themeId');
		 params._id = _id;
		 params.themeId = themeId;
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


