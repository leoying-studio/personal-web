define(['require', '../common/utils'],function (require, utils) {
    var columns = {
        articles: [
            { field: "title", title: "标题", width: '100px' },
            { field: 'description', title: '文章说明' },
            { field: 'img', title: '图片地址', width: '100px' },
            { field: 'navId', title: '导航id', width: '100px' },
            { field: 'serverTime', title: '发布时间' },
            // {title: '操作', command: ['edit', 'destroy']}
            {
                title: '操作', command: [
                    {
                        text: '删除', click: function (e) {
                            var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
                            var categoryId = dataItem.categoriesId.toJSON()[0].id;
                            window.confirm("确定删除吗?", function() {
                                $.ajax({
                                    url: '/article/del',
                                    dataType: 'json',
                                    type: 'post',
                                    data: {
                                        navId: dataItem.navId,
                                        articleId: dataItem._id,
                                        categoryId: categoryId
                                    },
                                    success: function(data) {
                                        $('#grid').data("kendoGrid").dataSource.read();
                                    },
                                    error: function(data) { 
                                        alert(data.msg);
                                    }
                                });
                            });
                        }
                    },
                    {
                        text: '编辑', click: function (e) {
                            debugger;
                            var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
                            var categoryId = dataItem.categoriesId.toJSON()[0].id;
                            $("#article-update-title").val(dataItem.title);
                            $("#article-update-navId").val(dataItem.navId);
                            $("#article-update-description").val(dataItem.description);
                            $("#article-update-img").val(dataItem.img);
                            $("#article-update-categoryId").val(categoryId);
                            $("#article-update-articleId").val(dataItem._id);
                            $("#articleUpdateForm").kendoWindow({
                                width: "400px",
                                title: "文章项编辑",
                                visible: false,
                                actions: [
                                    "Pin",
                                    "Minimize",
                                    "Maximize",
                                    "Close"
                                ]
                            }).data("kendoWindow").center().open();
                        }
                    },
                    {
                        text: '详情', click: function (e) {
    
                            var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
                            $.ajax({
                                url: '/article/article_detail/getDetail',
                                type: 'get',
                                dataType: 'json',
                                data: {articleId: dataItem._id},
                                success: function(data) { 
                                    $('#article_detail_articleId').val(data.data.params.articleId);
                                    $("#article_detail_title").val(data.data.title || "");
                                    var editor = $("#article-detail-content").data("kendoEditor");
                                    editor.value($('<div>').html(data.data.content).text());
                                    $("#detailForm").kendoWindow({
                                        width: "1000px",
                                        title: "设置文章详情",
                                        visible: false,
                                        actions: [
                                            "Pin",
                                            "Minimize", 
                                            "Maximize",
                                            "Close"
                                        ]
                                    }).data("kendoWindow").center().open();
                                },
                                error: function() {
                                    alert("获取信息失败");
                                }
                            });
                        }
                    }
                ]
            }
        ],
        categories:[
            { field: 'name', title: '类别名称' },
            { field: '_id', title: 'id' },
            { command: "destroy", title: " ", width: "150px" },

            // {
            //     title: '操作', command: [
            //         {
            //             name: 'destroy', text: '删除', click: function () {

            //             }
            //         },
            //         {
            //             name: 'edit', text: '编辑', click: function (item) {

            //             }
            //         },
            //     ]
            // }
        ],
        navs: [
            { field: 'name', title: '导航名称'},
            { field: '_id', title: 'id' },
            {
                title: '操作', command: [
                    {
                        name: 'destroy', text: '删除', click: function () {

                        }
                    },
                    {
                        name: 'edit', text: '编辑', click: function (item) {

                        }
                    },
                ]
            }
        ]
    };

    var editor = {
        tools : [
            "bold",
            "italic",
            "underline",
            "strikethrough",
            "justifyLeft",
            "justifyCenter",
            "justifyRight",
            "justifyFull",
            "insertUnorderedList",
            "insertOrderedList",
            "indent",
            "outdent",
            "createLink",
            "unlink",
            "insertImage",
            "insertFile",
            "subscript",
            "superscript",
            "createTable",
            "addRowAbove",
            "addRowBelow",
            "addColumnLeft",
            "addColumnRight",
            "deleteRow",
            "deleteColumn",
            "viewHtml",
            "formatting",
            "cleanFormatting",
            "fontName",
            "fontSize",
            "foreColor",
            "backColor",
            "print"
        ],
         resizable: {
            content: true,
            toolbar: false
        },
    };
    
    return {
        columns: columns,
        editor: editor
    };
});