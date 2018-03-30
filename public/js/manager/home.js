define(["init","config"], function(init, config) {
	var types = 0;
	//  初始化推荐文章
	// var recommendedDS = {
	// 	transport: {
	// 		read: {
	// 			url: "/recommended/data",
	// 			dataType: 'json',
	// 			type: "get",
	// 		},
	// 		parameterMap: function(option, operation) {
	// 			return option;
	// 		}
	// 	},
	// 	batch: true,
	// 	schema: {
	// 		data: 'data'
	// 	}
	// };
	
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


	var specialDS = {
		transport: {
			read: {
				url: "/special/data",
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
	// function cancelRecommend(e) {
	// 	var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
	// 	if(window.confirm("确定取消关注?")) {
	// 		$.ajax({
	// 			url: "/recommend/delete",
	// 			data: {articleId: dataItem._id},
	// 			dataType: 'json',
	// 			type: 'post',
	// 			success: function(data) {
	// 				if (!data.status) {
	// 					return alert('取消失败');
	// 				}
	// 				$('#recommendedGrid').data("kendoGrid").dataSource.read();
	// 			},
	// 			error: function() {
	// 				alert("取消失败");
	// 			}
	// 		});
	// 	}
	// }

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
			var loading = init.loading();
			$.ajax({
				url: "/intro/submit",
				data:{
					title: params.title,
					caption: params.caption,
					description: params.description
				},
				dataType: 'json',
				type: 'post',
				success: function(res) {
					loading.close();
					if (res.data.status) {
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
		destroyIntro: function(id) {
		   if (window.confirm('确定删除吗?')) {
			  $.ajax({
				 url: "/intro/destory",
				 dataType:"json",
				 data: {
					id: id
				 },
				 type: "post",
				 success: function(res) {
					$("#homeGrid").data("kendoGrid").dataSource.read();
					alert("success");
				 },
				 error: function() {
					alert("请求失败");
				 }
			  });
		   }
		},
		introApply: function(id) {
			if (window.confirm('确定应用该介绍吗?')) {
				var laoding = init.loading();
				$.ajax({
				   url: "/intro/apply",
				   dataType:"json",
				   data: {id:id},
				   type: "post",
				   success: function(res) {
					  if (res.status) {
						return laoding.close();
					  }
					  init.dialog("应用失败");
				   },
				   error: function() {
					  init.dialog("应用失败!");
				   }
				});
			 }
		},
		submitSpecial: function(params, succ) {
			$.ajax({
				url: "/special/submit",
				data:{
					title: params.title,
					headline: params.headline,
					homeFigure: params.homeFigure
				},
				dataType: "json",
				type: "post",
				success: succ,
				error: function() {
					alert("请求错误");
				}
			});
		},
		getNewSpecial: function(succ) {
			$.ajax({
				url: "/special/data",
				dataType: "json",
				type: "get",
				success: succ,
				error: function() {
					alert("请求错误");
				}
			});
		}
	};

	function getParams(el) {
		var params = {};
		el.each(function(index, item) {
			if (index === el.length - 1) return;
			var key = $(item).children().eq(1).attr("name");
			var value = $(item).children().eq(1).val();
			params[key] = value;
		});
		return params;
	}

	$("#introFormSet button").click(function() {
		var params = getParams($("#introFormSet > .form-item"));
		request.setIntro(params);
	});

	// 添加专题信息
	$("#specialFormAdd button").click(function() {
		var params = getParams($("#specialFormAdd > .form-item"));
		request.submitSpecial(params, function(res) {
			if (res.status) {
				alert("添加成功");
			} else {
				alert("添加失败");
			}
		});
	});

	// 应用
	var applyIntro = function(e) {
		var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
		request.introApply(dataItem._id);
	}

	// 消灭
	var destroyIntro = function(e) {
		var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
		request.destroyIntro(dataItem._id);
	}

	// 获取最新的主题
	var getNewSpecial = function() {
		request.getNewSpecial(function(res) {
			debugger;
			if (res.status) {
				var select = $("#homeToolBar .select").eq(0);
				select.empty();
				var str = "";
				$(res.data).each(function(index, item) {
					str += "<option>"+item.title+"</option>";
				});
				var newSelect = $("<select class='select'></select>").append(str);
				select.after(newSelect);
				select.next().kendoDropDownList({});
				select.remove();
			} else {
				alert("获取最新主题失败!");
			}
		});
	}

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
				init.window($("#specialFormAdd"), "添加专题信息", "400px")
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
				init.grid(grid, introDS, config.columns.intro(destroyIntro, applyIntro), '介绍信息列表');
				break;
			case '3':
				init.grid(grid, specialDS, config.columns.special(), '专题项');
				getNewSpecial();
				break;
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