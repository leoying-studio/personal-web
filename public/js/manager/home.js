

define(["init","config"], function(init, config) {
	//  初始化推荐文章
	var recommendedDS = {
		transport: {
			read: {
				url: "/recommended/data",
				dataType: 'json',
				type: "get",
			},
			parameterMap: function(option, operation) {
				return option;
			}
		},
		batch: true,
		schema: {
			data: 'data'
		}
	};
	

	// 初始化所有文章列表
	var articleDS = {
		transport: {
			read: {
				url: "/home/recommended/data",
				dataType: 'json',
				type: "get",
			},
			parameterMap: function(option, operation) {
				return option;
			}
		},
		batch: true,
		schema: {
			data: 'data'
		}
	};
	


	// 取消首页推荐
	function cancelRecommend(e) {
		var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
		if(window.confirm("确定取消关注?")) {
			$.ajax({
				url: "/recommend/delete",
				data: {articleId: dataItem._id},
				dataType: 'json',
				type: 'post',
				success: function(data) {
					if (!data.status) {
						return alert('取消失败');
					}
					$('#recommendedGrid').data("kendoGrid").dataSource.read();
				},
				error: function() {
					alert("取消失败");
				}
			});
		}
	}

	// 初始化spliter
	var spliter = $("#spliterHome").kendoSplitter({
		panes: [
			{ collapsible: true, size: '200px' },
			{ collapsible: false }
		]
	});

	var createGrid = function(type) {
		var grid = $("#homeGrid");
		if (grid.data('kendoGrid')) {
			grid.data("kendoGrid").destroy();
		}
		switch(type) {
			case '0':
				init.grid(grid, 
					recommendedDS, 
					config.columns.homeRecommend(cancelRecommend), 
					'已推荐到首页'
				);
				break;

			case '1':
				init.grid(grid, articleDS, config.columns.articles(), '所有文章列表' );
				break;
		}
	}


	// 左侧菜单切换
	$("#spliterHome>ul>li").each(function(index, item) {
		$(item).on('click', function(e) {
			$('.selected').removeClass('selected');
			$(this).addClass('selected');
			debugger;
			createGrid($(this).attr('type'));
		});
	});


	// define(function() {
	// 	var ds = {
	// 		transport: {
	// 			read: {
	// 				url: "/home/recommended/data",
	// 				dataType: 'json',
	// 				type: "get",
	// 			},
	// 			parameterMap: function(option, operation) {
	// 				return option;
	// 			}
	// 		},
	// 		batch: true,
	// 		schema: {
	// 			data: 'data'
	// 		}
	// 	};
	// 	init.grid($("#articleGrid"), ds, config.columns.articles() );
	// }); 
	// // 初始化intro 
	// var introDs = {
	// 	transport: {
	// 		read: {
	// 			url: "/nav/data",
	// 			dataType: 'json',
	// 			type: "get",
	// 		},
	// 		parameterMap: function(option, operation) {
	// 			return option;
	// 		}
	// 	},
	// 	batch: true,
	// 	schema: {
	// 		data: 'data',
	// 		total: 'total',
	// 	}
	// };
	// init.grid($("#recommendGrid"));

});