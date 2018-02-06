define(['require', 'utils', 'init'], function (require, utils, init) {
    var columns = {};

    // article
    columns.articles = function (destroy, edit) {
        var articles = [
            { field: "title", title: "标题", width: '100px' },
            { field: 'description', title: '文章说明' },
            { field: 'img', title: '图片地址', width: '100px' },
            { field: 'navId', title: '导航id', width: '100px' },
            { field: 'serverTime', title: '发布时间' },
            {
                title: '操作', command: [
                    {
                        text: '删除', click: destroy || new Function()
                    },
                    {
                        text: '编辑', click: edit || new Function()
                    }
                ]
            }
        ]
        return articles;
    }

    // 类别
    columns.categories = function () {
        var categories = [
            { field: 'name', title: '类别名称' },
            { field: '_id', title: 'id' },
            { command: "destroy", title: " ", width: "150px" },
        ]
        return categories;
    }

    // 导航
    columns.navs = function (destroy, edit) {
        var navs = [
            { field: 'name', title: '导航名称' },
            { field: '_id', title: 'id' },
            {
                title: '操作', command: [
                    { name: 'destroy', text: '删除', click: destroy || new Function},
                    { name: 'edit', text: '编辑', click: edit || new Function},
                ]
            }
        ]
        return navs;
    }

    // editor
    var editor = {
        tools: [
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