define(function (require) {
    var columns = {
        articles: [
            { field: "title", title: "标题", width: '100px' },
            { field: 'description', title: '文章说明' },
            { field: 'img', title: '图片地址', width: '100px' },
            { field: 'navId', title: '导航id', width: '100px' },
            { field: 'serverTime', title: '发布时间' },
            {
                title: '操作', command: [
                    {
                        text: '删除', click: function (e) {
                            debugger;
                            var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
                            var categoryId = dataItem.categoriesId.toJSON()[0].id;
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
                                    debugger;
                                    console.log(data)
                                },
                                error: function(data) { 
                                    alert(data);
                                }
                            });
                        }
                    },
                    {
                        text: '编辑', click: function (item) {
                            var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
                        }
                    },
                    {
                        text: '添加', click: function (e) {
                            $("#article-detail-window").kendoWindow({
                                width: "1000px",
                                title: "添加文章详情",
                                visible: false,
                                actions: [
                                    "Pin",
                                    "Minimize",
                                    "Maximize",
                                    "Close"
                                ]
                            }).data("kendoWindow").center().open();
                        }
                    }
                ]
            }
        ],
        categories:[
            { field: 'name', title: '类别名称' },
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