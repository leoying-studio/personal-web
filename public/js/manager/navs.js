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
    // 导航菜单
    $("#navMenu").kendoMenu({});

    // 左侧panel
    $("#panelWrapper").kendoPanelBar({
        expandMode: "multiple",
        select: function (e) {
            var panelItem = $(e.item);
            panelItemType = panelItem.attr("panel-item-type");
            
            switch (panelItemType) {
                case '0':
                    // navId = panelItem.attr("navId");
                    // var navs = JSON.parse(panelItem.attr("navs"));
                    // grid = init.grid(navs, config.columns.navs);
                    break;

                case '1':
                    navId = panelItem.attr("navId");
                    grid = init.grid(categories, config.columns.categories);
                    break;

                case '2':
                    categoryId = panelItem.attr("categoryId");
                    getArticleCategory($(panelItem).siblings().andSelf());
                    var url = "/article/data?navId="+navId+ "&categoryId=" + categoryId;
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
                    
                    init.grid(ds, config.columns.articles);
                    break;
            }
        }
    });



    // $("#article-detail-content").kendoEditor(config.editor);

    // $("#article_detail_submit").click(function () {
    //     var content = $("#article-detail-content").val();
    //     var title = $("#article_detail_title").val();
    //     var articleId = $('#article_detail_articleId').val();
    //     // var categoriesId = currentArticle.categoriesId.toJSON();
    //     // categoriesId = JSON.stringify(categoriesId);
    //     $.ajax({
    //         url: '/article/article_detail/submit',
    //         type: 'post',
    //         data: {
    //             articleId: articleId,
    //             content: content,
    //             title: title
    //         },
    //         dataType: "json",
    //         success: function (data) {
    //             if (data.code == 200) {
    //                 alert('success');
    //             }
    //         },
    //         error: function (data) {
    //             alert('error');
    //         }
    //     });
    // });


    function openEditor() {
        var articleEditor = $("#articleForm #articleEditor");
        if (articleEditor.data("kendoEditor")) {
           return;
        } 
        articleEditor.kendoEditor({
            resizable: {
                content: false,
                toolbar: true
            },
            change: function() {

            },
            select: function() {

            },
            execute: function() {

            },
            paste: function() {

            }
        });
        
    }

    function getArticleCategory(categories) {
        // 设置导航标示
        $("#navIdInput").val(navId);
        // 获取分类
        var categoryStr = "";
        $.each(categories, function(index, item) {
            var item = $(item);
            var id = item.attr("categoryId");
            var value = item.text();
            categoryStr += "<input type='checkbox' name='categoriesId[]' value=" + id + ">"
            + value;
        });
        $("#blogCateory").html(categoryStr);
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
                        init.window($("#categoryForm"));
                        break;
    
                    case '2':
                        openEditor();
                        init.window($("#articleForm"), "添加文章", "900px");
                        break;
                }
            } else {
                $('#grid').data("kendoGrid").dataSource.read();
            }
        }
    });
});