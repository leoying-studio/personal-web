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
                    var ds =  {
                        type: "get",
                        transport: {
                            read: {
                                url: url,
                                dataType: 'json'
                            },
                            destroy: {
                                url: "",
                                dataType: 'json'
                            },
                            parameterMap: function(option, operation) {
                                return option;
                            }
                        },
                        schema: {
                            data: 'data.articles',
                            total: 'data.params.total',
                        },
                        pageSize: 10
                    };
                    init.grid(ds, config.columns.articles);
                    break;
            }
        }
    });
    // 初始化right-header
    $("#buttonGroup").kendoMobileButtonGroup({});

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
        var articleId = $('#article_detail_navId').val();
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