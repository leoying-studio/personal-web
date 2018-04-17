
define([
    'require',
    'init',
    'config',
], function (require, init, config) {
    var panelItemType = 0;
    var navId = null;
    var categoriesId = [];
    var categoryId = null;
    var articleId = null;
    var grid = null;
    var categories = null;
    var panelItem = null;
    var tabStrip = $('.tab-strip-item:eq(1)');
    var rightBar = tabStrip.find(".right-container:eq(0)");
    var gridView = rightBar.find(".grid:eq(0)");
    var toolbar = rightBar.find(".toolbar:eq(0)");
    var leftBar = tabStrip.find(".left-container:eq(0)");
    var panel = leftBar.find("#panelWrapper");
    var window = null;
    // 导航菜单
    $("#navMenu").kendoMenu({});
    // 初始化spliter
	var spliter = tabStrip.find(".wrapper").eq(0).kendoSplitter({
		panes: [
			{ collapsible: true, size: '200px' },
			{ collapsible: false }
		]
	});
    // 左侧panel, 查询
    panel.kendoPanelBar({
        expandMode: "multiple",
        select: function (e) {
            panelItem = $(e.item);
            panelItemType = panelItem.attr("panel-item-type");
            switch (panelItemType) {
                case '0':
                var ds = {
                    transport: {
                        read: {
                            url: "/nav/data",
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
                        total: 'total',
                    }
                };
                grid = init.grid(gridView, ds, config.columns.categories(null, editNav));
                break;

                case '1':
                    navId = panelItem.attr("navId");
                    var url = "/nav/categories/data?navId="+navId;
                    var ds = {
                        transport: {
                            read: {
                                url: url,
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
                            total: 'total',
                        }
                    };
                    grid = init.grid(gridView, ds, config.columns.categories(null, editCategory));
                    break;

                case '2':
                    categoryId = panelItem.attr("categoryId");
                    navId = panelItem.attr("navId");
                    var url = "/article/data?navId="+navId + "&categoryId=" + categoryId;
                    var ds = {
                        transport: {
                            read: {
                                url: url,
                                dataType: 'json',
                                type: "get",
                            },
                            parameterMap: function(option, operation) {
                                return option;
                            }
                        },
                        batch: true,
                        schema: {
                            data: 'articles',
                            total: 'total',
                        }
                    };
                    grid = init.grid(gridView, ds, config.columns.articles(destroyArticle, editArticle));
                    break;
            }
        }
    });

    var request = {
        addNav: function(params, succ) {
            $.ajax({
                url: '/nav/submit',
                type: 'post',
                dataType: 'json',
                data: params,
                success: succ,
                error: function(e) {
                    alert('添加导航失败');
                }
            })
        },
        updateNav: function(name, succ) {
            $.ajax({
                url: '/nav/update',
                type: 'post',
                dataType: 'json',
                success: succ,
                error: function() {
                    alert('编辑导航失败!');
                }
            })
        },
        addCatgory: function(name, succ) {
            $.ajax({
                url: '/nav/category/add',
                type: 'post',
                dataType: 'json',
                success: succ,
                error: function() {
                    alert('请求错误!');
                }
            })
        },
        updateCategory: function(params, succ) {
            $.ajax({
                url: '/nav/categoies/update',
                type: 'post',
                data: params,
                success: succ,
                error: function() {
                    alert('请求错误');
                }
            })
        },
        addArticle: function(params, succ) {
            $.ajax({
                url: '/article/submit',
                type: 'post',
                data: params,
                success: succ,
                error: function() {
                    alert('请求错误');
                }
            })
        },
        updateArticle: function(params, succ) {
            $.ajax({
                url: '/article/update',
                type: 'post',
                data: params,
                success: succ,
                error: function() {
                    alert('请求错误');
                }
            })
        }
    };
    
    // 更新article
    rightBar.find('#articleUpdateForm button:eq(0)').click(function() {
        var params = getParams($(this).parent().siblings().andSelf());
        request.updateArticle(params, function(res) {
            if (res.status) {
                gridView.data("kendoGrid").dataSource.read();
                window.close();
                alert("添加成功");
            } else {
                alert("添加失败");
            }
        });
    });

    rightBar.find('#articleForm button:eq(0)').click(function() {
        var params = getParams($(this).parent().siblings().andSelf());
        request.addArticle(params, function(res) {
            if (res.status) {
                gridView.data("kendoGrid").dataSource.read();
                window.close();
                alert("添加成功");
            } else {
                alert("添加失败");
            }
        });
    });

    rightBar.find('#categoryForm button:eq(0)').click(function() {
        var params = getParams($(this).parent().andSelf());
        request.addCatgory(params, function(res) {
            if (res.status) {
                gridView.data("kendoGrid").dataSource.read();
                window.close();
                alert("添加成功");
            } else {
                alert("添加失败");
            }
        });
    });

    rightBar.find('#categoryUpdateForm button:eq(0)').click(function() {
        var params = getParams($(this).parent().siblings().andSelf());
        request.updateCategory(params, function(res) {
            if (res.status) {
                gridView.data("kendoGrid").dataSource.read();
                window.close();
                alert("添加成功");
            } else {
                alert("添加失败");
            }
        });
    });

    rightBar.find('#navForm button:eq(0)').click(function() {
        var params = getParams($(this).parent().siblings().andSelf());
        request.addNav(params, function(res) {
            if (res.status) {
                gridView.data("kendoGrid").dataSource.read();
                window.close();
                alert("添加成功");
            } else {
                alert("添加失败");
            }
        });
    });

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

    // 获取文章分类
    var getArticleCategory = function (el, categories) {
        var categoryStr = "";
        $.each(categories, function(index, item) {
            var item = $(item);
            var id = item.attr("categoryId");
            var value = item.text();
            categoryStr += "<input type='checkbox' name='categoriesId[]' value=" + id + ">"
            + value;
        });
        el.html(categoryStr);
    }

    // 编辑文章
    function editArticle(e) {
        var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
        // 设置编辑器的value值
        var editor = init.editor($("#articleUpdateEditor"));
        editor.value(dataItem.content || "")
        $("#articleUpdateForm").children().each(function(index, child) {
            var widget = $(child).children().eq(1);
            var name = widget.attr("name");
            var value = dataItem[name];
            if (name == "recommend") {
                $(widget).attr("checkbox", value);
            }
            widget.val(value);
        });
        // 编辑的时候先去获取文章类别
        getArticleCategory($("#articleUpdateForm #categories"), $(panelItem).siblings().andSelf());
        // 根据对比设置选中
        $("#articleUpdateForm #categories").children().each(function(oIndex, cate) {
            var id = $(cate).attr("value");
            dataItem.categoriesId.forEach(function(cateItem, index) {
                if (id == cateItem.id) {
                    $(cate).attr("checked", true);
                }
            });
        });
        $("#articleUpdateForm #articleId").val(dataItem._id);
        init.window($("#articleUpdateForm"), "文章项编辑", "800px");
    }

    // 删除文章
    function destroyArticle(e) {
        var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
        if (window.confirm("确定删除吗?")) {
            $.ajax({
                url: '/article/delete',
                dataType: 'json',
                type: 'post',
                data: {
                    articleId: dataItem._id,
                },
                success: function(data) {
                    gridView.data("kendoGrid").dataSource.read();
                },
                error: function(data) { 
                    alert(data.msg);
                }
            });
        }
    }

    // 编辑文章类别
    function editCategory(e) {
        var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
        // 把当前行的值操作dom
        $("#categoryUpdateForm #categoryUpdateInput").val(dataItem.name);
        $("#categoryUpdateForm #categoryIdUpdateInput").val(dataItem._id);
        init.window($("#categoryUpdateForm"));
    }

    // 更新导航
    function editNav(e) {
        var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
        $("#navUpdateForm").find("input").eq(0).val(dataItem.name);
        $("#navUpdateForm").find("input").eq(1).val(dataItem._id);
        init.window($("#navUpdateForm"));
    }
    
    // toobar 栏
    toolbar.kendoToolBar({
        items: [
            {type: "button", text: "添加", id: "add"},
            {type: "button", text: "刷新", id: "refresh" }
        ],
        click: function(e) {
            if (e.id == "add") {
                switch(panelItemType) {
                    case '0':
                        window = init.window($("#navForm"));
                        break;
    
                    case '1':
                        $("#categoryForm #categoryNavId").val(navId);
                        window = init.window($("#categoryForm"));
                        break;
    
                    case '2':
                        getArticleCategory($("#articleForm #categories"), $(panelItem).siblings().andSelf());
                        $("#navIdInput").val(navId);
                        window = init.window($("#articleForm"), "添加文章", "900px");
                        break;
                }
            } else {
                gridView.data("kendoGrid").dataSource.read();
            }
        }
    });

});