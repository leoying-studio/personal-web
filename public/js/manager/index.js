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
    // 导航菜单
    $("#navMenu").kendoMenu({});

    // 左侧panel, 查询
    $("#panelWrapper").kendoPanelBar({
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
                grid = init.grid(null, ds, config.columns.categories(null, editNav));
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
                    grid = init.grid(null, ds, config.columns.categories(null, editCategory));
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
                    init.grid(null, ds, config.columns.articles(destroyArticle, editArticle));
                    break;
            }
        }
    });

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
                    $('#grid').data("kendoGrid").dataSource.read();
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
    $("#toolbar").kendoToolBar({
        items: [
            {type: "button", text: "添加", id: "add"},
            {type: "button", text: "刷新", id: "refresh" }
        ],
        click: function(e) {
            if (e.id == "add") {
                switch(panelItemType) {
                    case '0':
                        init.window($("#navForm"));
                        break;
    
                    case '1':
                        $("#categoryForm #categoryNavId").val(navId);
                        init.window($("#categoryForm"));
                        break;
    
                    case '2':
                        getArticleCategory($("#articleForm #categories"), $(panelItem).siblings().andSelf());
                        $("#navIdInput").val(navId);
                        init.window($("#articleForm"), "添加文章", "900px");
                        break;
                }
            } else {
                $('#grid').data("kendoGrid").dataSource.read();
            }
        }
    });



});