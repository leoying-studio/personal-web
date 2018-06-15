define(['jquery'], function($) {
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

	var introTables = $('.intro > .intro-table').bootstrapTable({
		url: '/intro/data',
		methods: 'get',
		toolbar: '.intro > .toolbar',   
		pageList: [10, 25, 50, 100],
		striped: true,                      //是否显示行间隔色
		cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
		pagination: true,                   //是否显示分页（*）
		sortable: false,                    //是否启用排序
		search: true, 
		showRefresh: true,     
		align: 'center',  
		columns: [
			{
				checkbox: true
			}, {
				title: '标语',
				field: 'slogan'
			},
			{
				title: '标题',
				field: 'title'
			},
			{
				title: '简介',
				field: 'intro'
			},
			{
				title: '主题标题',
				field: 'headline'
			},
			{
				title: '应用',
				field: 'apply',
				formatter: function(v) {
					return true ? '是' : '否';
				}
			},
			{
				title: '创建时间',
				field: 'updateTime'
			},
			{
				title: '更新时间',
				field: 'updateTime'
			}
		]
	});
});