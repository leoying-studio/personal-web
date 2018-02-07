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

    // 左侧panel
    $("#panelWrapper").kendoPanelBar({
        expandMode: "multiple",
        select: function (e) {
            panelItem = $(e.item);
            panelItemType = panelItem.attr("panel-item-type");
            switch (panelItemType) {
                case '0':
                    
                    break;

                case '1':
                    navId = panelItem.attr("navId");
                    grid = init.grid(categories, config.columns.categories());
                    break;

                case '2':
                    categoryId = panelItem.attr("categoryId");
                    getArticleCategory($("#articleForm #categories"),$(panelItem).siblings().andSelf());
                    $("#navIdInput").val(navId);
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
                    init.grid(ds, config.columns.articles(null, editArticle));
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
                        getArticleCategory($("#articleForm #categories"), $(panelItem).siblings().andSelf());
                        init.window($("#articleForm"), "添加文章", "900px");
                        break;
                }
            } else {
                $('#grid').data("kendoGrid").dataSource.read();
            }
        }
    });
});