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

    // 导航菜单
    $("#nav-menu").kendoMenu({});
    $("#gridRefreshBtn").click(function() {
         $('#grid').data("kendoGrid").dataSource.read();
    });
    // 左侧panel
    $("#panelWrapper").kendoPanelBar({
        expandMode: "multiple",
        select: function (e) {
            var panelItem = e.item;
            panelItemType = panelItem.getAttribute("panel-item-type");
            
            switch (panelItemType) {
                case '0':
                    navId = panelItem.getAttribute("navId");
                    var navs = JSON.parse(panelItem.getAttribute("navs"));
                    grid = init.grid(navs, config.columns.navs);
                    break;

                case '1':
                    navId = panelItem.getAttribute("navId");
                    categories = JSON.parse(panelItem.getAttribute("categories"));
                    grid = init.grid(categories, config.columns.categories);
                    break;

                case '2':
                    navId = panelItem.getAttribute("navId");
                    categoryId = panelItem.getAttribute("categoryId");
                    var url = "/article/view" + "/" + navId + "/" + categoryId + "/" + 1;
                    var ds = {
                        transport: {
                            read: {
                                url: url,
                                dataType: 'json',
                                type: "get",
                            },
                            update: {
                                url: "/Products/Update",
                                dataType: "json",
                                type: 'post'
                            },
                            destroy: {
                                url: "/article/del",
                                dataType: "json",
                                type: 'post'
                            },
                            create: {
                                url: "/article/submit",
                                dataType: "json",
                                type: 'post'
                            },
                            parameterMap: function(option, operation) {
                                if (operation == 'create' && option.models) {
                                    return {
                                        ...option.models[0]
                                    }
                                }
                                if (operation !== 'read' && operation !== "create") {
                                    var categoryId = option.categoriesId[0].id;
                                    switch(operation) {
                                        case 'destroy':
                                            return {
                                                navId: option.navId,
                                                articleId: option._id,
                                                categoryId: categoryId
                                            };
                                        case 'update' :
                                           return {
                                               navId: option.navId,
                                               articleId: option._id,
                                               categoryId: categoryId,
                                               title: option.title,
                                               description: option.description,
                                               img: option.img
                                           };
                                    }
                                }
                                return option;
                            }
                        },
                        batch: true,
                        schema: {
                            data: 'data.articles',
                            total: 'data.params.total',
                            model: {
                               id: '_id',    //id 为必填,否则作增删改动作不会触发请求
                               fields: {
                                    title: { editable: true, nullable: false },
                                    categoriesId: ""
                               }
                            }
                        }
                    };
                    var temp = kendo.template(
                        "# for(var i = 0; i < categories.length; i++) { #"
                            + "<input text='checkbox'> #= categories[i].name #"
                        + "# } #"
                    );
                    temp = kendo.template(temp);
                    var categoriesTemp = {
                        title: "选择",  //checkbox  
                        width: 180,  
                        field: "selector",
                        template: temp,
                        filterable: false  
                    };
                    config.columns.articles.push(categoriesTemp);
                    init.grid(ds, config.columns.articles);
                    break;
            }
        }
    });
    // 初始化right-header
    // $("#buttonGroup").kendoMobileButtonGroup({});

    // 添加列表项
    $("#groupItemAdd").click(function () {
        if (panelItemType == 0) {
            init.window($("#nav-window"), "添加导航模块");
        }
        else if (panelItemType == 1) {
            $('#categoryNavId').val(navId);
            init.window($("#categoryWindow"), "添加文章类别");
        } else if (panelItemType == 2) {
            $("#blog-cateory").html("");
            for (var c = 0; c < categories.length; c++) {
                $("#blog-cateory").append(
                    "<input type='checkbox' name='categoriesId[]' value=" + categories[c]._id + ">"
                    + categories[c].name
                );
            }
            $("#navId-input").val(navId);
            init.window($("#article-window"), "添加文章列表项");
        }
    });

    $("#article-detail-content").kendoEditor(config.editor);

    $("#article_detail_submit").click(function () {
        var content = $("#article-detail-content").val();
        var title = $("#article_detail_title").val();
        var articleId = $('#article_detail_articleId').val();
        // var categoriesId = currentArticle.categoriesId.toJSON();
        // categoriesId = JSON.stringify(categoriesId);
        $.ajax({
            url: '/article/article_detail/submit',
            type: 'post',
            data: {
                articleId: articleId,
                content: content,
                title: title
            },
            dataType: "json",
            success: function (data) {
                if (data.code == 200) {
                    alert('success');
                }
            },
            error: function (data) {
                alert('error');
            }
        });
    });
});