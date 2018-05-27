define([
    'require',
    'init',
    'config',
], function (init, config) {
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
    var panelView = leftBar.find("#panelWrapper");
    var kendoWindow = null;
    var editor = null;
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
    var panelInstance = panelView.kendoPanelBar({
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
                grid = init.grid(gridView, ds, config.columns.navs(null, editNav));
                break;

                case '1':
                    navId = panelItem.attr("nav-id");
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
                    categoryId = panelItem.attr("category-id");
                    navId = panelItem.attr("nav-id");
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
                            data: 'data',
                            total: 'total',
                        }
                    };
                    grid = init.grid(gridView, ds, config.columns.articles(destroyArticle, editArticle));
                    break;
            }
        }
    });

    var request = {
        url: {
            addNav: '/nav/submit',
            updateNav: '/nav/update',
            addCatgory: '/nav/category/add',
            updateCategory: '/nav/categoies/update',
            addArticle: '/article/submit',
            updateArticle: '/article/update'
        },
        submit: function(url, params, succ) {
            $.ajax({
                url: url,
                type: 'post',
                dataType: 'json',
                data: params,
                success: function(res) {
                    if (res.status) {
                        gridView.data("kendoGrid").dataSource.read();
                        kendoWindow.close();
                        succ(res);
                    } else {
                        alert("提交失败");
                    }
                },
                error: function(e) {
                    alert('添加失败');
                }
            })
        },
        get: function(url, params, succ) {
           $.ajax({
               url: url,
               type: 'get',
               dataType: 'json',
               success: succ,
               error: function() {
                   alert('请求失败!');
               }
           })     
        }
    };
    
    rightBar.find("#navUpdateForm button:eq(0)").click(function() {
        var params = getParams($(this).parent().siblings().andSelf());
        request.submit(request.url.updateNav, params, function(res) {
            if (res.status) {
                alert('更新完成!');
            } else {
                alert(res.msg);
            }
        });
    });

    // 更新article
    rightBar.find('#articleUpdateForm button:eq(0)').click(function() {
        var params = getParams($(this).parent().siblings().andSelf());
        params.recommend = params.recommend.length ? true : false;
        params.content = editor.value();
        request.submit(request.url.updateArticle, params, function(res) {
            if (res.status) {
                alert('更新完成!');
            } else {
                alert(res.msg);
            }
        });
    });

    rightBar.find('#articleForm button:eq(0)').click(function() {
        var params = getParams($(this).parent().siblings().andSelf());
        params.recommend = params.recommend.length ? true : false;
        request.submit(request.url.addArticle, params, function(res) {
            
        });
    });

    rightBar.find('#categoryForm button:eq(0)').click(function() {
        var params = getParams($(this).parent().siblings().andSelf());
        request.submit(request.url.addCatgory, params, function(res) {
            if (res.status) {
                clearParams($("#categoryForm").children());
                alert("添加成功!");
            }
        });
    });

    rightBar.find('#categoryUpdateForm button:eq(0)').click(function() {
        var params = getParams($(this).parent().siblings().andSelf());
        request.submit(request.url.updateCategory, params, function(res) {
            if (res.status) {
                clearParams($("#categoryForm").children());
                alert("更新成功!");
            }
        });
    });

    rightBar.find('#navForm button:eq(0)').click(function() {
        var params = getParams($(this).parent().siblings().andSelf());
        var categories = [];
        try {
            categories = params.categories.split(/,|，/g);
        } catch(e) {
            alert("类别格式添加错误");
            return;
        }
        request.submit(request.url.addNav, params, function(res) {
            if (res.status) {
                // 同步添加到导航
                var panelBar = panelInstance.kendoPanelBar().data("kendoPanelBar")
                panelBar.append({
                    text: params.name
                },  panelBar.select());
                var lastChild = panelView.find(".outer-panel:eq(0)").children(":last-child");
                lastChild.attr({
                    'panel-item-type': 1,
                    'nav-id': res.data._id
                });
                // 设置选中
                panelBar.select(lastChild);
                // append
                categories.forEach(function(item, index) {
                    panelBar.append({
                        text: item
                    },  panelBar.select());
                });
                lastChild.find("li").each(function(item, index) {
                   $(item).attr({
                       'panel-item-type': 2,
                       'category-id': item._id,
                       'nav-id': res.data._id
                   }) 
                });
            }else {
                alert("添加导航失败");
            }
        });
    });

    // 初始化导航
    // request.getCategories(function(res) {
    //      if (res.status) {
    //          init.panelView(panelView, res.data, function(e, uid) {
    //             var parent = $(e.node).parent();
    //             $(e.node).siblings().andSelf().each(function(index, item) {
    //                 var dataUid = $(item).attr('data-uid');
    //                 if (uid == dataUid) {
    //                     navId = $(item)._id;
    //                 }
    //             });
    //          }, function() {
                 
    //          });
    //      }
    // });

    function getParams(el) {
		var params = {};
		el.each(function(index, item) {
            if (index === el.length - 1) return;
            if ($(item).attr('checkbox-item')) {
                var widgets = $(item).children(":not(:first-child)");
                var categoies = [];
                widgets.each(function(index, widget) {
                    if ($(widget).is(':checked')) {
                        if ($(widget).val()) {
                            categoies.push($(widget).val());
                        } else {
                            categoies.push(true);
                        }
                    }
                });
                if (widgets.length > 0) {
                    params[widgets.eq(0).attr('name')] = categoies;
                }
            } else {
                var key = $(item).children().eq(1).attr("name");
                var value = $(item).children().eq(1).val();
                if (key) {
                    params[key] = value;
                }
            }
		});
		return params;
    }
    
    function clearParams(el) {
		// 清空文本输入内容
		el.find(".form-item > input").val("");
		el.find(".form-item > textarea").val("");
		// el.find(".form-item > button").attr("model", 0);
	}

    // 获取文章分类
    var getArticleCategory = function (el, categories) {
        el.html("<label>所属分类</label>");
        var categoryStr = "";
        $.each(categories, function(index, item) {
            var item = $(item);
            var id = item.attr("category-id");
            var value = item.text();
            categoryStr += "<input type='checkbox' name='categoriesId' value=" + id + ">"
            + value;
        });
        el.append(categoryStr);
    }

    // 编辑文章
    function editArticle(e) {
        var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
        // 设置编辑器的value值
        editor = init.editor($("#articleUpdateEditor"));
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
        var checkItem = $("#articleUpdateForm .form-item:eq(4)");
        getArticleCategory(checkItem, $(panelItem).siblings().andSelf());
        // 根据对比设置选中
        checkItem.children().each(function(oIndex, cate) {
            var id = $(cate).attr("value");
            dataItem.categoriesId.forEach(function(cateItem, index) {
                if (id == cateItem.id) {
                    $(cate).attr("checked", true);
                }
            });
        });

        $("#articleUpdateForm").children().eq(5).children(":last-child").attr('checked', dataItem.recommend);
        $("#articleUpdateForm #articleId").val(dataItem._id);
        kendoWindow = init.window($("#articleUpdateForm"), "文章项编辑", "800px");
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
        kendoWindow = init.window($("#categoryUpdateForm"));
    }

    // 更新导航
    function editNav(e) {
        var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
        $("#navUpdateForm").find("input").eq(0).val(dataItem.name);
        $("#navUpdateForm").find("input").eq(1).val(dataItem._id);
        kendoWindow = init.window($("#navUpdateForm"));
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
                        kendoWindow = init.window($("#navForm"));
                        break;
    
                    case '1':
                        $("#categoryForm #categoryNavId").val(navId);
                        kendoWindow = init.window($("#categoryForm"));
                        break;
    
                    case '2':
                        getArticleCategory($("#articleForm .form-item:eq(4)"), $(panelItem).siblings().andSelf());
                        $("#navIdInput").val(navId);
                        kendoWindow = init.window($("#articleForm"), "添加文章", "900px");
                        break;
                }
            } else {
                gridView.data("kendoGrid").dataSource.read();
            }
        }
    });
});