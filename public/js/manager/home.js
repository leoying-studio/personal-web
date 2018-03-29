define(["init","config"], function(init, config) {
	var types = 0;
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
				url: "/article/data/all",
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

	// 介绍信息
	var introDS = {
		transport: {
			read: {
				url: "/intro/data",
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

	
	$("#homeToolBar > select").kendoDropDownList({});


	// 接口请求列表项目
	var request = {
		setIntro: function(params) {
			debugger;
			var loading = init.loading();
			$.ajax({
				url: "/intro/set",
				data:{
					title: params.title,
					caption: params.caption,
					description: params.description
				},
				dataType: 'json',
				type: 'post',
				success: function(res) {
					loading.close();
					if (res.status) {
						init.dialog("添加完成");
						$("#homeGrid").data("kendoGrid").dataSource.read();
					} else {
						init.dialog("添加失败")
					}
				},
				error: function() {
					init.dialog("请求发生错误!")
				}
			})	
		},
		
	};

	$("#introFormSet button").click(function() {
		debugger;
		var params = {};
		$("#introFormSet > .form-item").each(function(index, item) {
			if (index == $("#introFormSet > .form-item").length - 1) return;
			var key = $(item).children().eq(1).attr("name");
			var value = $(item).children().eq(1).val();
			params[key] = value;
		});

		request.setIntro(params);
	});

	$("#homeToolBar button").click(function() {
		 switch(type) {
			 case '0':
				 break;
			case '1':
				break;
			case '2':
				init.window($("#introFormSet"), "设置介绍信息", "400px")
				break;
			case '3':
				break;
		 }
	});

	var loadGrid = function(type) {
		var grid = $("#homeGrid");
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

			case '2':
				init.grid(grid, introDS, config.columns.intro(), '介绍信息列表');
				break;
			case '3':
				// configTheme();
		}
	}

	

	// 左侧菜单切换
	$("#spliterHome>ul>li").each(function(index, item) {
		$(item).on('click', function(e) {
			$('.selected').removeClass('selected');
			$(this).addClass('selected');
			type = $(this).attr('type');
			loadGrid(type);
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