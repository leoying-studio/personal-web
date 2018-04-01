define(["init","config"], function(init, config) {
	var types = 0,
	theme_id = null,
	intro_id = null,
	tab = $(".tab-strip-item:first"),
	rightContainer = tab.find(".right-container").eq(0),
	modulePages = rightContainer.find(".module-page"),
	introGrid = modulePages.eq(0).find(".grid:first");
	
	var dataSource = {
		intro: {
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
		},
		special: {
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
		},
		themes: {
			transport: {
				read: {
					url: "/special/themes/data",
					dataType: 'json',
					type: "get",
				},
				parameterMap: function(option, operation) {
					option.id = theme_id;
					return option;
				}
			},
			batch: true,
			schema: {
				data: 'data'
			}
		}
	};
	


	// 初始化spliter
	var spliter = tab.find(".wrapper").eq(0).kendoSplitter({
		panes: [
			{ collapsible: true, size: '200px' },
			{ collapsible: false }
		]
	});

	// 接口请求列表项目
	var request = {
		setIntro: function(params) {
			var loading = init.loading();
			$.ajax({
				url: "/intro/submit",
				data:{
					title: params.title,
					caption: params.caption,
					description: params.description,
					id: params.id
				},
				dataType: 'json',
				type: 'post',
				success: function(res) {
					loading.close();
					if (res.status) {
						introGrid.data("kendoGrid").dataSource.read();
						clearParams($("#introFormSet"));
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
					introGrid.data("kendoGrid").dataSource.read();
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
		},
		submitTheme:function(params, succ) {
			$.ajax({
				url: "/special/themes/submit",
				dataType: "json",
				type: "post",
				data: params,
				success: succ,
				error: function(err) {
					alert("请求错误!");
				}
			})
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

	function setParams(el, values) {
		el.each(function(index, item) {
			var widget = $(item).children().eq(1);
			var key = widget.attr("name");
			for (var val in values) {
				if (val === key &&　widget[0].tagName === 'INPUT') {
					widget.val(values[val]);
				} else if (val === key &&　widget[0].tagName === "TEXTAREA" ) {
					widget.text(values[val]);
				}
			}
		});
	}

	function clearParams(el) {
		// 清空文本输入内容
		var c = el.find(".form-item > input").val("");
		el.find(".form-item > textarea").text("");
		el.find(".form-item > button").attr("model", 0);
	}

	$("#introFormSet > .form-item button").eq(0).click(function() {
		var params = getParams($("#introFormSet > .form-item"));
		if ($(this).attr("model") == 1) {
			params.id = intro_id;
		} 
		request.setIntro(params);
	});
	
	// 添加专题信息
	$("#specialForm button").eq(0).click(function() {
		var params = getParams($("#specialForm > .form-item"));
		request.submitSpecial(params, function(res) {
			if (res.status) {
				alert("添加成功");
			} else {
				alert("添加失败");
			}
		});	
	});

	$("#themesForm button:first").click(function() {
		var params = getParams($("#themesForm > .form-item"));
		params.id = theme_id;
		request.submitTheme(params, function(res) {
			if (res.status) {
				alert("添加成功");
			} else {
				alert("添加失败");
			}
		});	
	});

	/**
	 * intro 模块, crud
	 */
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

	// 编辑
	var editIntro = function(e) {
		var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
		intro_id = dataItem._id;
		setParams($("#introFormSet > .form-item"), dataItem);
		$("#introFormSet > .form-item > button").eq(0).attr("model", 1);
	}

	/**
	 * 专题模块
	 */
	// 编辑
	var editSpecial = function(e) {
		var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
		setParams($("#specialForm > .form-item"), dataItem);
		$("##specialForm > .form-item > button").eq(0).attr("model", 1);
	}

	// 获取最新的主题
	var getNewSpecial = function() {
		request.getNewSpecial(function(res) {
			if (res.status) {
				var select =  tab.find(".select:first");
				select.empty();
				var str = "";
				$(res.data).each(function(index, item) {
					str += "<option value='"+item._id+"'>"+item.title+"</option>";
				});
				var newSelect = $("<select class='select'></select>").append(str);
				select.after(newSelect);
				var grid = modulePages.eq(1).find(".grid:eq(1)");
				var dropDown = select.next().kendoDropDownList({
					change: function(e) {
					   theme_id = dropDown.value();
					   grid.data("kendoGrid").dataSource.read();
					}
				});
				select.remove();
				var dropDown = dropDown.data("kendoDropDownList");
				dropDown.select(0);
				theme_id = res.data[0]._id;
				if (res.data.length > 0) {
					init.grid(grid, dataSource.themes, config.columns.themes(), "主题列表")
				} else {
					grid.text("暂无数据!")
					.css({"text-align": "center"});
				}
			} else {
				alert("获取最新主题失败!");
			}
		});	
	}


	var loadFirstGrid = function(grid) {
		init.grid(introGrid, dataSource.intro, config.columns.intro(destroyIntro, applyIntro, editIntro), '介绍信息列表');
	}
	loadFirstGrid();

	var loadModule = function(type) {
		switch(type) {
			case '2':
				modulePages.show().not(":eq(0)").hide();
				break;
			case '3':
				modulePages.show().not(":eq(1)").hide();
				var grid = modulePages.eq(1).find(".grid:eq(0)");
				init.grid(grid, dataSource.special, config.columns.special(null, editSpecial), '专题项');
				getNewSpecial();
				break;
		}
	}

	// 左侧菜单切换
	$(".tab-strip-item").eq(0).find("ul > li").each(function(index, item) {
		$(item).on('click', function(e) {
			$('.selected').removeClass('selected');
			$(this).addClass('selected');
			type = $(this).attr('type');
			loadModule(type);
		});
	});

});