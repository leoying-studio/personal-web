

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
	init.grid($("#recommendedGrid"), 
				recommendedDS, 
				config.columns.homeRecommend(cancelRecommend), 
				'已推荐到首页' 
	);

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
	init.grid($("#articleGrid"), articleDS, config.columns.articles(), '所有文章列表' );


	// 取消首页推荐
	function cancelRecommend(e) {
		var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
		if(window.confirm("确定取消关注?")) {
			$.ajax({
				url: "",
				data: {articleId: dataItem._id},
				dataType: 'json',
				success: function() {
					$('#recommendedGrid').data("kendoGrid").dataSource.read();
				},
				error: function() {
					kendo.alert("取消关注失败");
				}
			});
		}
	}

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