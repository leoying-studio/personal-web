define(['jquery', 'api', 'config' ], function($, api, config) {
	$('.aside-bar .list-group-item > a').click(function() {
		var icon = $(this).children().last();
		// 如果已经折叠
		if (icon.attr('collapsing') === 'true') {
			icon.removeClass('glyphicon-menu-up')
			.addClass('glyphicon-menu-down').attr('collapsing', false);
		} else {
			icon.removeClass('glyphicon-menu-down')
			.addClass('glyphicon-menu-up').attr('collapsing', true);
		}
	});

	var themeEvents = {
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
			if ($('.main > .breadcrumb > li > a[tick=theme]').length) {
				return;
			}
			$('.main > .breadcrumb').append("<li><a href='#' class='disabled' disabled='true' tick='theme'>主题<a/></li>");
			$('.main > .breadcrumb > li:last-child').prev().children(':first-child').removeClass('disabled');
		}
	};

	$('.main > .breadcrumb > li > a').click(function() {
		var disabled = $(this).attr('disabled');
		if (disabled) {
			return;
		}
		var tick = $(this).attr('tick');
		$(this).addClass('disabled');
		$('.main > section').hide();
		$('#' +　$(this).attr('tick')).show();
	});

	var intro = config.table.intro(introEvents);;
	$('#introTable').bootstrapTable(intro);

	var refreshTbale = function() {
		$('#introTable').bootstrapTable('refresh');
	}

	$('#introNewly').click(function() {
		debugger;
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
});


