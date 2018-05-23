define(["init", "config", "invok", "request"], function(init, config, invok, request) {
	var theme_id = null,
	intro_id = null,
	special_id = null,
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
				data: 'data',
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
	var request1 = {
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
		},
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
				if (val === key) {
					widget.val(values[val]);
				} 
			}
		});
	}

	function clearParams(el) {
		// 清空文本输入内容
		el.find(".form-item > input").val("");
		el.find(".form-item > textarea").val("");
		el.find(".form-item > button").attr("model", 0);
	}

	$("#introFormSet > .form-item button").eq(0).click(function() {
		var params = getParams($("#introFormSet > .form-item"));
		if ($(this).attr("model") == 1) {
			params.id = intro_id;
		} 
		request.post('/intro/submit', params)
		.then(function(res)	{
			introGrid.data("kendoGrid").dataSource.read();
			clearParams($("#introFormSet"));
		});
	});
	
	// 添加专题信息
	$("#specialForm button").eq(0).click(function() {
		var params = getParams($("#specialForm > .form-item"));
		request.post('/special/submit', params)
		.then(function(res) {
			special_id = null;
			modulePages.eq(1).find(".grid:first").data("kendoGrid").dataSource.read();
			clearParams($("#specialForm"));
		});
	});

	$("#themesForm button:first").click(function() {
		var params = getParams($("#themesForm > .form-item"));
		params.id = theme_id;
		request.post('/special/themes/submit', params)
		.then(function(res) {
			theme_id = null;
			modulePages.eq(1).find(".grid:eq(1)").data("kendoGrid").dataSource.read();
			if (res.status) {
				clearParams($("#themeForm"));
			}	
		})
	});
	/**
	 * intro 模块, crud
	 */
	// 应用
	var applyIntro = function(e) {
		var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
		if (window.confirm('确定应用该介绍吗?')) {
			request.post('/intro/apply', {id: dataItem._id});
		}
	}

	// 消灭
	var destroyIntro = function(e) {
		var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
		if (window.confirm('确定删除吗?')) {
			request.post("/intro/destory", {id: dataItem._id});
		}
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
		special_id = dataItem._id;
		setParams($("#specialForm > .form-item"), dataItem);
		$("#specialForm > .form-item > button").eq(0).attr("model", 1);
	}

	var destorySpecial = function(e) {
		var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
		if(confirm("确定删除专题吗? 该操作会清除当前专题下的主题项!")) {
			request.post('/special/destory', {id: dataItem._id}).then(function(res) {
				modulePages.eq(1).find(".grid:first").data("kendoGrid").dataSource.read();
			});
		}
	}

	// 获取最新的主题
	var getNewSpecial = function() {
		request.get('/special/data').then(function(res) {
			if (res.status) {
				var select =  tab.find(".select:first");
				select.empty();
				var str = "";
				$(res.data).each(function(index, item) {
					str += "<option value='"+item._id+"'>"+item.headline+"</option>";
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
					init.grid(grid, dataSource.themes, config.columns.themes(null, editTheme), "主题列表")
				} else {
					grid.text("暂无数据!")
					.css({"text-align": "center"});
				}
			} 
		});

	}

	// 编辑主题
	var editTheme = function(e) {
		var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
		theme_id = dataItem._id;
		setParams($("#themesForm > .form-item"), dataItem);
	}

	var destoryTheme = function(e) {
		var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
		request.post("/special/destory", {themeId:dataItem.id, specialId: special_id})
		.then(function(res) {
			modulePages.eq(1).find(".grid:eq(1)").data("kendoGrid").dataSource.read();
		});
	}

	// // 修改主题
	// var editTheme = function(e) {
	// 	var params = getParams($("#themesForm .form-item"));
	// 	params.id = theme_id;
	// 	request.submitTheme(params, function(res) {
	// 		theme_id = null;
	// 		if (res.status) {
	// 			clearParams($("#themeForm"));
	// 			modulePages.eq(1).find(".grid:eq(1)").data("kendoGrid").dataSource.read();
	// 			alert("保存成功!");
	// 		} else {
	// 			alert("保存失败!");
	// 		}
	// 	});
	// }

	init.grid(introGrid, dataSource.intro, config.columns.intro(destroyIntro, applyIntro, editIntro), '介绍信息列表');

	var loadModule = function(type) {
		switch(type) {
			case '2':
				modulePages.show().not(":eq(0)").hide();
				break;
			case '3':
				modulePages.show().not(":eq(1)").hide();
				var grid = modulePages.eq(1).find(".grid:eq(0)");
				init.grid(grid, dataSource.special, config.columns.special(destorySpecial, editSpecial), '专题项');
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